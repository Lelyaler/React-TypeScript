import React, { useState, useEffect, useCallback } from 'react';
import type { Game, BacklogStatus } from '../types/game';
import { PlatformIcons } from './PlatformIcons';
import { CriticScore } from './CriticScore';
import { X, Star, Play, Clock, Check, Monitor, Image as ImageIcon, Info, Film, Calendar, Timer, Award, Maximize2 } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface Props {
  game: Game | null;
  isOpen: boolean;
  onClose: () => void;
  userStatus?: BacklogStatus | null;
  userRating?: number;
  onUpdateStatus?: (game: Game, status: BacklogStatus | null) => void;
  onUpdateRating?: (gameId: number, rating: number) => void;
}

const MODAL_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=80';

export const GameDetailsModal: React.FC<Props> = ({
  game,
  isOpen,
  onClose,
  userStatus = null,
  userRating = 0,
  onUpdateStatus,
  onUpdateRating,
}) => {
  const [prevGameId, setPrevGameId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'screenshots' | 'trailer' | 'specs'>('overview');
  const [activePreviewImage, setActivePreviewImage] = useState<string | null>(null);

  if (game && game.id !== prevGameId) {
    setPrevGameId(game.id);
    setActiveTab('overview');
    setActivePreviewImage(null);
  }

  const handleClose = useCallback(() => {
    sounds.playBack();
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleClose]);

  if (!isOpen || !game) return null;

  const releaseYear = game.released ? new Date(game.released).getFullYear() : null;
  const screenshots = game.short_screenshots && game.short_screenshots.length > 0
    ? game.short_screenshots
    : [{ id: 1, image: game.background_image }];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-6 lg:p-8 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="absolute inset-0" onClick={handleClose} />

      <div className="relative w-full max-w-5xl bg-zinc-900 border-t sm:border border-white/10 rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.95)] z-10 h-[94vh] sm:h-auto sm:max-h-[92vh] flex flex-col">
        <div className="sm:hidden w-12 h-1 rounded-full bg-white/20 mx-auto my-2 shrink-0" />

        {activeTab !== 'trailer' && (
          <button
            type="button"
            onClick={() => {
              sounds.playSelect();
              setActivePreviewImage(game.background_image || MODAL_FALLBACK_IMAGE);
            }}
            className="absolute top-3 left-3 sm:top-4 sm:left-4 z-30 inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/90 text-zinc-300 hover:text-white text-xs font-medium backdrop-blur-md border border-white/10 transition-all hover:scale-105 shadow-lg"
            title="Открыть постер целиком без обрезки"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Постер целиком</span>
          </button>
        )}

        <button
          type="button"
          onClick={handleClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 p-2 rounded-full bg-black/60 hover:bg-black/90 text-zinc-300 hover:text-white backdrop-blur-md transition-all hover:scale-105 shadow-lg border border-white/10"
          title="Закрыть (Esc)"
        >
          <X className="w-5 h-5" />
        </button>

        {activeTab !== 'trailer' && (
          <div
            onClick={() => {
              sounds.playSelect();
              setActivePreviewImage(game.background_image || MODAL_FALLBACK_IMAGE);
            }}
            className="relative h-44 sm:h-64 md:h-72 w-full overflow-hidden shrink-0 bg-zinc-950 cursor-pointer group/hero"
            title="Кликните, чтобы открыть постер целиком без обрезки"
          >
            <img
              src={game.background_image || MODAL_FALLBACK_IMAGE}
              alt={game.name}
              onError={(e) => {
                e.currentTarget.src = MODAL_FALLBACK_IMAGE;
              }}
              className="w-full h-full object-cover object-top group-hover/hero:scale-102 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 via-30% to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/70 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-3 sm:bottom-5 left-4 sm:left-6 right-4 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-3">
              <div className="max-w-3xl">
                <div className="flex items-center gap-2 mb-1.5 sm:mb-2 flex-wrap">
                  <PlatformIcons platforms={game.parent_platforms} />
                  <CriticScore score={game.metacritic} />
                  {releaseYear && (
                    <span className="text-[11px] sm:text-xs font-mono font-medium px-2 sm:px-2.5 py-0.5 rounded-full bg-black/50 text-zinc-300 backdrop-blur-md border border-white/10">
                      {releaseYear}
                    </span>
                  )}
                  {game.genres?.[0] && (
                    <span className="text-[11px] sm:text-xs font-medium px-2 sm:px-2.5 py-0.5 rounded-full bg-white/15 text-white backdrop-blur-md">
                      {game.genres[0].name}
                    </span>
                  )}
                </div>
                <h2 className="text-xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight drop-shadow-lg">
                  {game.name}
                </h2>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'trailer' && (
          <div className="px-4 sm:px-6 pt-4 sm:pt-5 pb-3 flex items-center justify-between border-b border-white/[0.06] bg-zinc-950/90 shrink-0 pr-14 sm:pr-16">
            <div>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <PlatformIcons platforms={game.parent_platforms} />
                <CriticScore score={game.metacritic} />
                {releaseYear && (
                  <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-white/10 text-zinc-300">
                    {releaseYear}
                  </span>
                )}
                <span className="text-xs text-amber-400 font-semibold px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/20">
                  Трейлер
                </span>
              </div>
              <h2 className="text-lg sm:text-2xl font-bold text-white tracking-tight">
                {game.name}
              </h2>
            </div>
          </div>
        )}

        <div className="flex items-center gap-1 sm:gap-2 border-b border-white/[0.08] px-4 sm:px-6 pt-2 bg-zinc-900/95 overflow-x-auto no-scrollbar shrink-0">
          <button
            type="button"
            onClick={() => {
              sounds.playNav();
              setActiveTab('overview');
            }}
            className={`flex items-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 px-3 sm:px-4 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-all ${
              activeTab === 'overview'
                ? 'border-white text-white shadow-sm'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Info className="w-4 h-4" />
            <span>Обзор</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sounds.playNav();
              setActiveTab('trailer');
            }}
            className={`flex items-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 px-3 sm:px-4 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-all ${
              activeTab === 'trailer'
                ? 'border-white text-white shadow-sm'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Film className="w-4 h-4" />
            <span>Трейлер</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sounds.playNav();
              setActiveTab('screenshots');
            }}
            className={`flex items-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 px-3 sm:px-4 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-all ${
              activeTab === 'screenshots'
                ? 'border-white text-white shadow-sm'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Скриншоты ({screenshots.length})</span>
          </button>

          {game.pc_requirements && (
            <button
              type="button"
              onClick={() => {
                sounds.playNav();
                setActiveTab('specs');
              }}
              className={`flex items-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 px-3 sm:px-4 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-all ${
                activeTab === 'specs'
                  ? 'border-white text-white shadow-sm'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Monitor className="w-4 h-4" />
              <span>Требования к ПК</span>
            </button>
          )}
        </div>

        <div
          className={`overflow-y-auto ${
            activeTab === 'trailer'
              ? 'p-3 sm:p-5 flex-1 flex flex-col justify-center'
              : 'p-5 sm:p-6 space-y-5'
          }`}
        >
          {activeTab === 'overview' && (
            <div className="space-y-5">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">Релиз</div>
                    <div className="text-xs sm:text-sm font-bold text-zinc-100 truncate">
                      {releaseYear ? `${releaseYear} г.` : 'Н/Д'}
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">Metacritic</div>
                    <div className="text-xs sm:text-sm font-bold text-emerald-400 truncate">
                      {game.metacritic ? `${game.metacritic} / 100` : '—'}
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0">
                    <Star className="w-4 h-4 fill-amber-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">Рейтинг RAWG</div>
                    <div className="text-xs sm:text-sm font-bold text-zinc-100 truncate">
                      {game.rating > 0 ? `${game.rating.toFixed(1)} / 5` : '—'}
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/15 text-purple-400 flex items-center justify-center shrink-0">
                    <Timer className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">Время игры</div>
                    <div className="text-xs sm:text-sm font-bold text-zinc-100 truncate">
                      {game.playtime > 0 ? `~${game.playtime} ч.` : '—'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 sm:p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="w-full sm:w-auto">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 block mb-1.5">
                    Статус в вашей библиотеке
                  </span>
                  <div className="flex items-center gap-1.5 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => {
                        sounds.playSelect();
                        onUpdateStatus?.(game, userStatus === 'playing' ? null : 'playing');
                      }}
                      className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        userStatus === 'playing'
                          ? 'bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/20 font-bold'
                          : 'bg-white/[0.05] hover:bg-white/10 text-zinc-300'
                      }`}
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Играю</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        sounds.playSelect();
                        onUpdateStatus?.(game, userStatus === 'backlog' ? null : 'backlog');
                      }}
                      className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        userStatus === 'backlog'
                          ? 'bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20 font-bold'
                          : 'bg-white/[0.05] hover:bg-white/10 text-zinc-300'
                      }`}
                    >
                      <Clock className="w-3 h-3" />
                      <span>В планы</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        sounds.playSelect();
                        onUpdateStatus?.(game, userStatus === 'completed' ? null : 'completed');
                      }}
                      className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        userStatus === 'completed'
                          ? 'bg-blue-500 text-zinc-950 shadow-md shadow-blue-500/20 font-bold'
                          : 'bg-white/[0.05] hover:bg-white/10 text-zinc-300'
                      }`}
                    >
                      <Check className="w-3 h-3" />
                      <span>Пройдено</span>
                    </button>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 block mb-1.5 sm:text-right">
                    Ваша личная оценка
                  </span>
                  <div className="flex items-center gap-1.5 sm:gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => {
                          sounds.playSelect();
                          onUpdateRating?.(game.id, star === userRating ? 0 : star);
                        }}
                        className="p-1 sm:p-1 hover:scale-125 active:scale-95 transition-transform"
                        title={`${star} из 5 звёзд`}
                      >
                        <Star
                          className={`w-4 h-4 sm:w-4 sm:h-4 ${
                            star <= (userRating || 0)
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-zinc-600 hover:text-yellow-400'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-1">
                <div>
                  <h4 className="text-xs uppercase font-bold tracking-wider text-zinc-500 mb-2">
                    Об игре
                  </h4>
                  <p className="text-sm text-zinc-300 leading-relaxed font-normal whitespace-pre-line">
                    {game.description_raw ||
                      `${game.name} — одна из самых ярких и увлекательных игр в своем жанре. Погрузитесь в захватывающую вселенную с детально проработанным миром, глубокими игровыми механиками и кинематографичной атмосферой.`}
                  </p>
                </div>

                {game.genres && game.genres.length > 0 && (
                  <div>
                    <h4 className="text-xs uppercase font-bold tracking-wider text-zinc-500 mb-2">
                      Жанры и теги
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {game.genres.map((genre) => (
                        <span
                          key={genre.id}
                          className="bg-white/[0.05] hover:bg-white/[0.08] text-zinc-300 text-xs px-3 py-1.5 rounded-lg border border-white/[0.06] transition-colors"
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'trailer' && (
            <div className="w-full flex-1 flex flex-col items-center justify-center">
              {game.trailer_url ? (
                <div
                  className="relative w-full aspect-video mx-auto rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/15 ring-1 ring-white/5"
                  style={{
                    maxHeight: 'calc(88vh - 200px)',
                    maxWidth: 'calc((88vh - 200px) * 16 / 9)',
                  }}
                >
                  <iframe
                    src={game.trailer_url}
                    title={`${game.name} Official Trailer`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="py-20 text-center text-zinc-400 bg-white/[0.02] rounded-2xl border border-white/[0.06] space-y-3 max-w-md w-full mx-auto">
                  <Film className="w-10 h-10 text-zinc-600 mx-auto" />
                  <p className="text-base font-semibold text-zinc-200">Официальный видеоролик пока не добавлен</p>
                  <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                    Вы можете посмотреть скриншоты геймплея и системные требования во вкладках выше.
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'screenshots' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {screenshots.map((s, idx) => (
                  <div
                    key={s.id || idx}
                    onClick={() => {
                      sounds.playSelect();
                      setActivePreviewImage(s.image);
                    }}
                    className="aspect-video rounded-xl overflow-hidden bg-zinc-950 cursor-pointer group relative border border-white/5 hover:border-white/25 transition-all shadow-md"
                  >
                    <img
                      src={s.image}
                      alt={`Screenshot ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-xs text-white bg-black/70 px-3 py-1.5 rounded-lg backdrop-blur-sm font-medium">
                        Увеличить фото
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'specs' && game.pc_requirements && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {game.pc_requirements.minimum && (
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2.5">
                  <h4 className="font-bold text-zinc-200 text-sm flex items-center gap-2">
                    <Monitor className="w-4 h-4 text-zinc-400" />
                    <span>Минимальные требования</span>
                  </h4>
                  <p className="text-zinc-400 leading-relaxed font-mono text-xs whitespace-pre-line">
                    {game.pc_requirements.minimum.replace(/<[^>]*>?/gm, ' ')}
                  </p>
                </div>
              )}

              {game.pc_requirements.recommended && (
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2.5">
                  <h4 className="font-bold text-zinc-200 text-sm flex items-center gap-2">
                    <Monitor className="w-4 h-4 text-emerald-400" />
                    <span>Рекомендуемые требования</span>
                  </h4>
                  <p className="text-zinc-400 leading-relaxed font-mono text-xs whitespace-pre-line">
                    {game.pc_requirements.recommended.replace(/<[^>]*>?/gm, ' ')}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {activePreviewImage && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center p-2 sm:p-8 bg-black/95 backdrop-blur-xl animate-fadeIn"
          onClick={() => setActivePreviewImage(null)}
        >
          <div
            className="relative max-w-5xl max-h-[95vh] sm:max-h-[92vh] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-zinc-950 shadow-2xl border border-white/20 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activePreviewImage}
              alt="Full Resolution View"
              className="w-full h-auto max-h-[85vh] object-contain select-none"
            />
            <button
              type="button"
              onClick={() => setActivePreviewImage(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 bg-black/70 hover:bg-black text-white rounded-full transition-all border border-white/20 shadow-lg hover:scale-105"
              title="Закрыть просмотр (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
