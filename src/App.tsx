import { useState, useMemo, useEffect, useCallback, lazy, Suspense } from 'react';
import { PS5Header } from './components/PS5Header';
import { PS5Backdrop } from './components/PS5Backdrop';
import { PS5Spotlight } from './components/PS5Spotlight';
import { PS5GameShelf } from './components/PS5GameShelf';
import { GameCard } from './components/GameCard';
import { GameCardSkeleton } from './components/GameCardSkeleton';
import { CatalogFilterBar } from './components/CatalogFilterBar';
import { ModalLayer, type ActiveModalType } from './components/ModalLayer';
import { Toast } from './components/Toast';
import { filterGames } from './utils/gameFilters';
import { getStoredPcSpecs } from './utils/pcCompatibility';
import type { UserPcSpecs } from './types/pcSpecs';
import { useGames } from './hooks/useGames';
import { useGenres } from './hooks/useGenres';
import { useBacklog, type BacklogEntry } from './hooks/useBacklog';
import { useUrlSync, getInitialUrlState } from './hooks/useUrlSync';
import { useGamepad } from './hooks/useGamepad';
import { sounds } from './utils/soundEffects';
import type { Game, GameQuery, BacklogStatus } from './types/game';
import { AlertCircle } from 'lucide-react';

const LibraryDashboard = lazy(() =>
  import('./components/LibraryDashboard').then((m) => ({ default: m.LibraryDashboard }))
);

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
  const [activeModal, setActiveModal] = useState<ActiveModalType>(null);
  const [compareGame, setCompareGame] = useState<Game | null>(null);
  const [viewMode, setViewMode] = useState<'console' | 'grid'>('console');
  const [isNarrowScreen, setIsNarrowScreen] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth < 1024 : false
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => sounds.getEnabled());
  const [reloadCounter, setReloadCounter] = useState<number>(0);
  const [userPcSpecs, setUserPcSpecs] = useState<UserPcSpecs>(() => getStoredPcSpecs());

  useEffect(() => {
    const handleResize = () => {
      setIsNarrowScreen(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const effectiveViewMode = isNarrowScreen ? 'grid' : viewMode;

  const { games, error, isLoading } = useGames(gameQuery, reloadCounter);
  const { genres } = useGenres();
  const {
    entries,
    updateStatus,
    updateRating,
    updateNote,
    getStatus,
    getRating,
    getNote,
    importEntries,
    stats,
  } = useBacklog();

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

  const isModalOpen = Boolean(selectedGame || compareGame || activeModal);

  const handleCloseActiveModal = useCallback(() => {
    if (selectedGame) {
      sounds.playBack();
      handleSelectGame(null);
      return true;
    }
    if (compareGame) {
      sounds.playBack();
      setCompareGame(null);
      return true;
    }
    if (activeModal) {
      sounds.playBack();
      setActiveModal(null);
      return true;
    }
    return false;
  }, [selectedGame, compareGame, activeModal, handleSelectGame]);

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
    if (!isModalOpen && currentFocusedGame) {
      sounds.playSelect();
      handleSelectGame(currentFocusedGame);
    }
  }, [isModalOpen, currentFocusedGame, handleSelectGame]);

  const handleGamepadBack = useCallback(() => {
    handleCloseActiveModal();
  }, [handleCloseActiveModal]);

  const handleUpdateGameStatus = useCallback(
    (game: Game, nextStatus: BacklogStatus | null) => {
      sounds.playSelect();
      updateStatus(game, nextStatus);
      const labels: Record<BacklogStatus, string> = {
        playing: 'Играю',
        backlog: 'В планах',
        completed: 'Пройдено',
      };
      setToastMessage(
        nextStatus ? `Статус обновлен: ${labels[nextStatus]}` : 'Удалено из бэклога'
      );
      setTimeout(() => setToastMessage(null), 2500);
    },
    [updateStatus]
  );

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
      handleUpdateGameStatus(currentFocusedGame, nextStatus);
    }
  }, [currentFocusedGame, getStatus, handleUpdateGameStatus]);

  const handleGamepadOpenRoulette = useCallback(() => {
    sounds.playSelect();
    setActiveModal((prev) => (prev === 'roulette' ? null : 'roulette'));
  }, []);

  const { isConnected: isGamepadConnected, gamepadName } = useGamepad({
    onNavigateLeft: handleGamepadNavigateLeft,
    onNavigateRight: handleGamepadNavigateRight,
    onSelect: handleGamepadSelect,
    onBack: handleGamepadBack,
    onToggleStatus: handleGamepadToggleStatus,
    onOpenRoulette: handleGamepadOpenRoulette,
  });

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName || '')) {
        return;
      }

      if (e.key === '?') {
        e.preventDefault();
        sounds.playSelect();
        setActiveModal((prev) => (prev === 'help' ? null : 'help'));
        return;
      }

      if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        handleToggleSound();
        return;
      }

      if (e.key === 'Escape') {
        handleCloseActiveModal();
        return;
      }

      if (effectiveViewMode === 'console' && !isModalOpen) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          handleGamepadNavigateLeft();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          handleGamepadNavigateRight();
        } else if (e.key === 'Enter' && currentFocusedGame) {
          e.preventDefault();
          sounds.playSelect();
          handleSelectGame(currentFocusedGame);
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [
    isModalOpen,
    effectiveViewMode,
    currentFocusedGame,
    handleCloseActiveModal,
    handleSelectGame,
    handleGamepadNavigateLeft,
    handleGamepadNavigateRight,
    handleToggleSound,
  ]);

  const handleShareLibrary = () => {
    const currentUrl = window.location.origin + window.location.pathname + '#library';
    const payload = {
      title: 'GameVault Library',
      text: `Моя игровая коллекция в GameVault: ${stats.total} игр (${stats.playing} играю, ${stats.completed} пройдено).`,
      url: currentUrl,
    };

    if (navigator.share) {
      navigator.share(payload).catch(() => {
        navigator.clipboard.writeText(currentUrl).then(() => {
          setToastMessage('Ссылка на библиотеку скопирована в буфер обмена!');
          setTimeout(() => setToastMessage(null), 3000);
        });
      });
    } else {
      navigator.clipboard.writeText(currentUrl).then(() => {
        setToastMessage('Ссылка на библиотеку скопирована в буфер обмена!');
        setTimeout(() => setToastMessage(null), 3000);
      });
    }
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

  const handleImportJson = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const parsed = JSON.parse(text);
        const count = importEntries(parsed);
        if (count > 0) {
          setToastMessage(`Успешно импортировано ${count} игр в библиотеку!`);
        } else {
          setToastMessage('Файл не содержит корректных записей бэклога.');
        }
      } catch {
        setToastMessage('Ошибка при чтении JSON файла.');
      }
      setTimeout(() => setToastMessage(null), 3000);
    };
    reader.readAsText(file);
  };

  const handleImportSteamEntries = (newEntries: BacklogEntry[]) => {
    const existingIds = new Set(newEntries.map((e) => e.game.id));
    const filteredExisting = entries.filter((e) => !existingIds.has(e.game.id));
    importEntries([...filteredExisting, ...newEntries]);
    setToastMessage(`Импортировано игр: ${newEntries.length}!`);
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
          setActiveModal('roulette');
        }}
        onOpenSettings={() => {
          sounds.playSelect();
          setActiveModal('settings');
        }}
        onOpenPcSpecs={() => {
          sounds.playSelect();
          setActiveModal('specs');
        }}
        userPcSpecs={userPcSpecs}
        libraryCount={stats.total}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        isGamepadConnected={isGamepadConnected}
        gamepadName={gamepadName}
      />

      <main
        className={`flex-1 flex flex-col ${
          effectiveViewMode === 'console' ? 'lg:justify-between' : ''
        } px-3 sm:px-8 max-w-[1600px] w-full mx-auto pb-[calc(3.5rem+env(safe-area-inset-bottom,0px))]`}
      >
        {showFavoritesOnly ? (
          <div className="py-4 sm:py-6 animate-fadeIn">
            <Suspense fallback={null}>
              <LibraryDashboard
                stats={stats}
                activeTab={activeBacklogTab}
                onSelectTab={setActiveBacklogTab}
                onShareLibrary={handleShareLibrary}
                onExportJson={handleExportJson}
                onImportJson={handleImportJson}
                onOpenSteamImport={() => setActiveModal('steam')}
              />
            </Suspense>

            <h2 className="sr-only">Избранные игры</h2>
            {displayedGames.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4.5">
                {displayedGames.map((game, idx) => (
                  <GameCard
                    key={game.id}
                    game={game}
                    priority={idx === 0}
                    userStatus={getStatus(game.id)}
                    userPcSpecs={userPcSpecs}
                    onUpdateStatus={handleUpdateGameStatus}
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
          <div
            className={`flex-1 flex flex-col ${
              effectiveViewMode === 'console' ? 'lg:justify-between' : ''
            }`}
          >
            {currentFocusedGame && !gameQuery.searchText && (
              <PS5Spotlight
                game={currentFocusedGame}
                userStatus={getStatus(currentFocusedGame.id)}
                userPcSpecs={userPcSpecs}
                onOpenPcSpecs={() => {
                  sounds.playSelect();
                  setActiveModal('specs');
                }}
                onOpenDetails={(game) => {
                  sounds.playSelect();
                  handleSelectGame(game);
                }}
                onUpdateStatus={handleUpdateGameStatus}
                onOpenCompare={(g) => setCompareGame(g)}
              />
            )}

            <div className="pt-3 sm:pt-6 pb-2">
              <CatalogFilterBar
                gameQuery={gameQuery}
                onUpdateQuery={setGameQuery}
                genres={genres}
                totalGamesCount={displayedGames.length}
                viewMode={effectiveViewMode}
                onViewModeChange={setViewMode}
              />
            </div>

            {error && (
              <div className="my-3 p-3.5 rounded-xl bg-rose-950/60 text-rose-300 text-xs flex items-center gap-2 shadow-sm">
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
                <h2 className="sr-only">Каталог игр</h2>
                {isLoading ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4.5">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <GameCardSkeleton key={i} />
                    ))}
                  </div>
                ) : displayedGames.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4.5">
                    {displayedGames.map((game, idx) => (
                      <GameCard
                        key={game.id}
                        game={game}
                        priority={idx === 0}
                        userStatus={getStatus(game.id)}
                        userPcSpecs={userPcSpecs}
                        onUpdateStatus={handleUpdateGameStatus}
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

      <ModalLayer
        activeModal={activeModal}
        onCloseModal={() => setActiveModal(null)}
        onOpenModal={setActiveModal}
        selectedGame={selectedGame}
        onCloseSelectedGame={() => handleSelectGame(null)}
        onSelectGame={handleSelectGame}
        compareGame={compareGame}
        onCloseCompareGame={() => setCompareGame(null)}
        onOpenCompare={setCompareGame}
        catalog={games}
        filteredCatalogGames={filteredCatalogGames}
        currentFocusedGame={currentFocusedGame}
        userPcSpecs={userPcSpecs}
        onUpdatePcSpecs={setUserPcSpecs}
        getStatus={getStatus}
        getRating={getRating}
        getNote={getNote}
        updateStatus={handleUpdateGameStatus}
        updateRating={updateRating}
        updateNote={updateNote}
        onImportSteamEntries={handleImportSteamEntries}
        onApiKeySaved={() => setReloadCounter((c) => c + 1)}
      />

      <footer className="hidden md:flex fixed bottom-0 inset-x-0 h-[calc(2.25rem+env(safe-area-inset-bottom,0px))] pb-[env(safe-area-inset-bottom,0px)] bg-zinc-950/80 backdrop-blur-md shadow-[0_-8px_24px_rgba(0,0,0,0.6)] z-30 px-4 sm:px-8 items-center justify-between text-xs text-zinc-400 select-none">
        <div className="flex items-center gap-2">
          {isGamepadConnected ? (
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold text-zinc-200">{gamepadName || 'Контроллер'}</span>
            </div>
          ) : (
            <span className="text-[11px] text-zinc-500 font-medium">GameVault PS5 Experience</span>
          )}
        </div>

        <div className="flex items-center gap-4 text-[11px] font-medium text-zinc-400">
          {isGamepadConnected ? (
            <>
              <span className="flex items-center gap-1.5"><kbd className="px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-300 font-bold">◀ ▶</kbd> Навигация</span>
              <span className="flex items-center gap-1.5"><kbd className="px-1.5 py-0.5 rounded bg-zinc-900 text-emerald-400 font-bold">✕</kbd> Выбрать</span>
              <span className="flex items-center gap-1.5"><kbd className="px-1.5 py-0.5 rounded bg-zinc-900 text-rose-400 font-bold">○</kbd> Назад</span>
              <span className="flex items-center gap-1.5"><kbd className="px-1.5 py-0.5 rounded bg-zinc-900 text-sky-400 font-bold">□</kbd> Статус</span>
              <span className="flex items-center gap-1.5"><kbd className="px-1.5 py-0.5 rounded bg-zinc-900 text-amber-400 font-bold">△</kbd> Случайная</span>
            </>
          ) : (
            <>
              <span className="flex items-center gap-1.5"><kbd className="px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-300 font-mono text-[10px]">/</kbd> Поиск</span>
              <span className="flex items-center gap-1.5"><kbd className="px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-300 font-mono text-[10px]">Esc</kbd> Закрыть</span>
              <button
                type="button"
                onClick={() => {
                  sounds.playSelect();
                  setActiveModal('help');
                }}
                className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
                title="Справка по управлению"
              >
                <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-300 font-mono text-[10px]">?</kbd>
                <span>Управление</span>
              </button>
            </>
          )}
        </div>
      </footer>

      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}

export default App;
