import { useState, useMemo, useEffect, useCallback } from 'react';
import { PS5Header } from './components/PS5Header';
import { PS5Backdrop } from './components/PS5Backdrop';
import { PS5Spotlight } from './components/PS5Spotlight';
import { PS5GameShelf } from './components/PS5GameShelf';
import { GameCard } from './components/GameCard';
import { GameCardSkeleton } from './components/GameCardSkeleton';
import { FilterChips } from './components/FilterChips';
import { GameDetailsModal } from './components/GameDetailsModal';
import { RouletteModal } from './components/RouletteModal';
import { LibraryDashboard } from './components/LibraryDashboard';
import { ApiKeyModal } from './components/ApiKeyModal';
import { Toast } from './components/Toast';
import { filterGames } from './utils/gameFilters';
import { useGames } from './hooks/useGames';
import { useGenres } from './hooks/useGenres';
import { useBacklog } from './hooks/useFavorites';
import { useUrlSync, getInitialUrlState } from './hooks/useUrlSync';
import { useGamepad } from './hooks/useGamepad';
import { sounds } from './utils/soundEffects';
import type { Game, GameQuery, BacklogStatus } from './types/game';
import { AlertCircle, LayoutGrid, Rows } from 'lucide-react';

function App() {
  const initialUrlState = useMemo(() => getInitialUrlState(), []);

  const [gameQuery, setGameQuery] = useState<GameQuery>(initialUrlState.gameQuery);
  const [selectedGameSlug, setSelectedGameSlug] = useState<string | null>(
    () => initialUrlState.gameSlug
  );
  const [selectedGameManual, setSelectedGameManual] = useState<Game | null>(null);
  const [focusedGame, setFocusedGame] = useState<Game | null>(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState<boolean>(
    initialUrlState.showFavoritesOnly
  );
  const [activeBacklogTab, setActiveBacklogTab] = useState<BacklogStatus | 'all'>('all');
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState<boolean>(false);
  const [isRouletteOpen, setIsRouletteOpen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'console' | 'grid'>('console');
  const [isNarrowScreen, setIsNarrowScreen] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth < 1024 : false
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => sounds.getEnabled());
  const [, setReloadCounter] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setIsNarrowScreen(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const effectiveViewMode = isNarrowScreen ? 'grid' : viewMode;

  const { games, error, isLoading } = useGames(gameQuery);
  const { genres } = useGenres();
  const { entries, updateStatus, updateRating, getStatus, getRating, stats } = useBacklog();

  const selectedGame = useMemo(() => {
    if (selectedGameManual) return selectedGameManual;
    if (selectedGameSlug && games.length > 0) {
      return games.find((g) => g.slug === selectedGameSlug) || null;
    }
    return null;
  }, [selectedGameManual, selectedGameSlug, games]);

  const currentFocusedGame = useMemo(() => {
    if (focusedGame) return focusedGame;
    if (selectedGame) return selectedGame;
    if (games.length === 0) return null;
    return games.find((g) => g.slug === 'the-witcher-3-wild-hunt') || games[0];
  }, [focusedGame, selectedGame, games]);

  const handleSelectGame = useCallback((game: Game | null) => {
    setSelectedGameManual(game);
    setSelectedGameSlug(game ? game.slug : null);
    if (game) {
      setFocusedGame(game);
    }
  }, []);

  const handleRestoreState = useCallback(
    (state: {
      showFavoritesOnly: boolean;
      gameQuery: GameQuery;
      gameSlug: string | null;
    }) => {
      setShowFavoritesOnly(state.showFavoritesOnly);
      setGameQuery(state.gameQuery);
      setSelectedGameSlug(state.gameSlug);
      if (!state.gameSlug) {
        setSelectedGameManual(null);
      } else {
        const found = games.find((g) => g.slug === state.gameSlug);
        if (found) {
          setSelectedGameManual(found);
          setFocusedGame(found);
        }
      }
    },
    [games]
  );

  useUrlSync({
    showFavoritesOnly,
    gameQuery,
    selectedGameSlug: selectedGame?.slug || null,
    onRestoreState: handleRestoreState,
  });

  const filteredCatalogGames = useMemo(
    () => filterGames(games, gameQuery),
    [games, gameQuery]
  );

  const libraryGames = useMemo(() => {
    let list = entries;
    if (activeBacklogTab !== 'all') {
      list = list.filter((e) => e.status === activeBacklogTab);
    }
    if (gameQuery.searchText) {
      const q = gameQuery.searchText.toLowerCase();
      list = list.filter((e) => e.game.name.toLowerCase().includes(q));
    }
    return list.map((e) => e.game);
  }, [entries, activeBacklogTab, gameQuery.searchText]);

  const displayedGames = showFavoritesOnly ? libraryGames : filteredCatalogGames;

  const handleToggleSound = useCallback(() => {
    const next = sounds.toggle();
    setSoundEnabled(next);
  }, []);

  const handleGamepadNavigateLeft = useCallback(() => {
    if (displayedGames.length === 0) return;
    sounds.playNav();
    const curIdx = displayedGames.findIndex((g) => g.id === currentFocusedGame?.id);
    const nextIdx = curIdx <= 0 ? displayedGames.length - 1 : curIdx - 1;
    setFocusedGame(displayedGames[nextIdx]);
  }, [displayedGames, currentFocusedGame]);

  const handleGamepadNavigateRight = useCallback(() => {
    if (displayedGames.length === 0) return;
    sounds.playNav();
    const curIdx = displayedGames.findIndex((g) => g.id === currentFocusedGame?.id);
    const nextIdx = curIdx >= displayedGames.length - 1 ? 0 : curIdx + 1;
    setFocusedGame(displayedGames[nextIdx]);
  }, [displayedGames, currentFocusedGame]);

  const handleGamepadSelect = useCallback(() => {
    if (!selectedGame && !isRouletteOpen && currentFocusedGame) {
      sounds.playSelect();
      handleSelectGame(currentFocusedGame);
    }
  }, [selectedGame, isRouletteOpen, currentFocusedGame, handleSelectGame]);

  const handleGamepadBack = useCallback(() => {
    if (selectedGame) {
      sounds.playBack();
      handleSelectGame(null);
    } else if (isRouletteOpen) {
      sounds.playBack();
      setIsRouletteOpen(false);
    } else if (isApiKeyModalOpen) {
      sounds.playBack();
      setIsApiKeyModalOpen(false);
    }
  }, [selectedGame, isRouletteOpen, isApiKeyModalOpen, handleSelectGame]);

  const handleGamepadToggleStatus = useCallback(() => {
    if (currentFocusedGame) {
      const current = getStatus(currentFocusedGame.id);
      const nextStatus: BacklogStatus | null =
        current === null
          ? 'playing'
          : current === 'playing'
          ? 'backlog'
          : current === 'backlog'
          ? 'completed'
          : null;
      sounds.playSelect();
      updateStatus(currentFocusedGame, nextStatus);
      setToastMessage(
        nextStatus
          ? `Статус обновлен: ${
              nextStatus === 'playing'
                ? 'Играю'
                : nextStatus === 'backlog'
                ? 'В планах'
                : 'Пройдено'
            }`
          : 'Удалено из бэклога'
      );
      setTimeout(() => setToastMessage(null), 2500);
    }
  }, [currentFocusedGame, getStatus, updateStatus]);

  const handleGamepadOpenRoulette = useCallback(() => {
    sounds.playSelect();
    setIsRouletteOpen((prev) => !prev);
  }, []);

  const { isConnected: isGamepadConnected, gamepadName } = useGamepad({
    onNavigateLeft: handleGamepadNavigateLeft,
    onNavigateRight: handleGamepadNavigateRight,
    onSelect: handleGamepadSelect,
    onBack: handleGamepadBack,
    onToggleStatus: handleGamepadToggleStatus,
    onOpenRoulette: handleGamepadOpenRoulette,
  });

  const handleShareLibrary = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setToastMessage('Ссылка скопирована в буфер обмена!');
      setTimeout(() => setToastMessage(null), 3000);
    });
  };

  const handleExportJson = () => {
    const dataStr = JSON.stringify(entries, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `gamevault-backlog-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setToastMessage('Файл бэклога успешно экспортирован!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="min-h-screen text-zinc-100 flex flex-col relative selection:bg-white selection:text-black">
      <PS5Backdrop activeGame={currentFocusedGame} />

      <PS5Header
        activeTab={showFavoritesOnly ? 'library' : 'catalog'}
        onSelectTab={(tab) => {
          sounds.playSelect();
          setShowFavoritesOnly(tab === 'library');
        }}
        searchText={gameQuery.searchText || ''}
        onSearch={(text) =>
          setGameQuery((prev) => ({ ...prev, searchText: text }))
        }
        onOpenRoulette={() => {
          sounds.playSelect();
          setIsRouletteOpen(true);
        }}
        onOpenSettings={() => {
          sounds.playSelect();
          setIsApiKeyModalOpen(true);
        }}
        libraryCount={stats.total}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        isGamepadConnected={isGamepadConnected}
        gamepadName={gamepadName}
      />

      <main className={`flex-1 flex flex-col ${effectiveViewMode === 'console' ? 'lg:justify-between' : ''} px-3 sm:px-8 max-w-[1600px] w-full mx-auto pb-4`}>
        {showFavoritesOnly ? (
          <div className="py-4 sm:py-6 animate-fadeIn">
            <LibraryDashboard
              stats={stats}
              activeTab={activeBacklogTab}
              onSelectTab={setActiveBacklogTab}
              onShareLibrary={handleShareLibrary}
              onExportJson={handleExportJson}
            />

            {displayedGames.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4.5">
                {displayedGames.map((game) => (
                  <GameCard
                    key={game.id}
                    game={game}
                    userStatus={getStatus(game.id)}
                    onUpdateStatus={(g, s) => {
                      sounds.playSelect();
                      updateStatus(g, s);
                    }}
                    onSelectGame={(g) => {
                      sounds.playSelect();
                      handleSelectGame(g);
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="py-16 sm:py-24 text-center">
                <p className="text-zinc-400 text-xs sm:text-sm">
                  В этом разделе пока нет игр. Добавьте игры из каталога!
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className={`flex-1 flex flex-col ${effectiveViewMode === 'console' ? 'lg:justify-between' : ''}`}>
            {currentFocusedGame && !gameQuery.searchText && (
              <PS5Spotlight
                game={currentFocusedGame}
                userStatus={getStatus(currentFocusedGame.id)}
                onOpenDetails={(g) => {
                  sounds.playSelect();
                  handleSelectGame(g);
                }}
                onUpdateStatus={(g, s) => {
                  sounds.playSelect();
                  updateStatus(g, s);
                }}
              />
            )}

            <div className="flex items-center justify-between gap-2 sm:gap-3 pt-3 sm:pt-6 pb-2 border-t border-white/10">
              <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar py-1 flex-1">
                <button
                  type="button"
                  onClick={() => {
                    sounds.playNav();
                    setGameQuery((prev) => ({ ...prev, genreId: null }));
                  }}
                  className={`px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    gameQuery.genreId === null
                      ? 'bg-white text-zinc-950 shadow-sm'
                      : 'bg-white/5 hover:bg-white/10 text-zinc-300'
                  }`}
                >
                  Все жанры
                </button>

                {genres.slice(0, 6).map((genre) => (
                  <button
                    key={genre.id}
                    type="button"
                    onClick={() => {
                      sounds.playNav();
                      setGameQuery((prev) => ({
                        ...prev,
                        genreId: prev.genreId === genre.id ? null : genre.id,
                      }));
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                      gameQuery.genreId === genre.id
                        ? 'bg-white text-zinc-950 shadow-sm'
                        : 'bg-white/5 hover:bg-white/10 text-zinc-300'
                    }`}
                  >
                    {genre.name}
                  </button>
                ))}

                <div className="h-4 w-px bg-white/15 shrink-0" />

                <FilterChips
                  activeChip={gameQuery.filterChip || 'all'}
                  onSelectChip={(chipId) => {
                    sounds.playNav();
                    setGameQuery((prev) => ({ ...prev, filterChip: chipId }));
                  }}
                />
              </div>

              <div className="hidden lg:flex items-center gap-1 bg-black/40 backdrop-blur-md p-1 rounded-xl border border-white/10 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    sounds.playSelect();
                    setViewMode('console');
                  }}
                  className={`p-1.5 rounded-lg transition-colors ${
                    effectiveViewMode === 'console'
                      ? 'bg-white text-black'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                  title="Консольная полка (PS5 Dock)"
                >
                  <Rows className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sounds.playSelect();
                    setViewMode('grid');
                  }}
                  className={`p-1.5 rounded-lg transition-colors ${
                    effectiveViewMode === 'grid'
                      ? 'bg-white text-black'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                  title="Сетка игр"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>

            {error && (
              <div className="my-3 p-3 rounded-xl bg-rose-950/40 border border-rose-900/50 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {effectiveViewMode === 'console' ? (
              <PS5GameShelf
                games={displayedGames}
                activeGameId={currentFocusedGame?.id || 0}
                onHoverGame={setFocusedGame}
                onSelectGame={handleSelectGame}
                getStatus={getStatus}
              />
            ) : (
              <div className="py-3 sm:py-6">
                {isLoading ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4.5">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <GameCardSkeleton key={i} />
                    ))}
                  </div>
                ) : displayedGames.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4.5">
                    {displayedGames.map((game) => (
                      <GameCard
                        key={game.id}
                        game={game}
                        userStatus={getStatus(game.id)}
                        onUpdateStatus={updateStatus}
                        onSelectGame={handleSelectGame}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="py-16 sm:py-20 text-center text-zinc-400 text-xs sm:text-sm">
                    Игры не найдены. Попробуйте изменить фильтры.
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      <GameDetailsModal
        game={selectedGame}
        isOpen={Boolean(selectedGame)}
        onClose={() => handleSelectGame(null)}
        userStatus={selectedGame ? getStatus(selectedGame.id) : null}
        userRating={selectedGame ? getRating(selectedGame.id) : 0}
        onUpdateStatus={updateStatus}
        onUpdateRating={updateRating}
      />

      <RouletteModal
        isOpen={isRouletteOpen}
        onClose={() => setIsRouletteOpen(false)}
        games={filteredCatalogGames}
        onSelectGame={handleSelectGame}
      />

      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onKeySaved={() => setReloadCounter((c) => c + 1)}
      />

      {isGamepadConnected && (
        <div className="fixed bottom-4 right-4 z-40 hidden md:flex items-center gap-3 px-4 py-2 rounded-full bg-zinc-950/85 backdrop-blur-md border border-white/10 text-xs text-zinc-300 shadow-2xl animate-fadeIn select-none">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-white">{gamepadName || 'Контроллер'}</span>
          </div>
          <div className="h-3 w-px bg-white/15" />
          <div className="flex items-center gap-2.5 text-[11px] font-mono text-zinc-400">
            <span><kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-sans font-semibold">◀ ▶</kbd> Выбор</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-white/10 text-emerald-300 font-sans font-semibold">A / ✕</kbd> Открыть</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-white/10 text-rose-300 font-sans font-semibold">B / ○</kbd> Назад</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-white/10 text-sky-300 font-sans font-semibold">X / □</kbd> Статус</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-white/10 text-amber-300 font-sans font-semibold">Y / △</kbd> Рулетка</span>
          </div>
        </div>
      )}

      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}

export default App;
