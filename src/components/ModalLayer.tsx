import React, { lazy, Suspense } from 'react';
import type { Game, BacklogStatus } from '../types/game';
import type { UserPcSpecs } from '../types/pcSpecs';
import type { BacklogEntry } from '../hooks/useBacklog';

const GameDetailsModal = lazy(() =>
  import('./GameDetailsModal').then((m) => ({ default: m.GameDetailsModal }))
);
const RouletteModal = lazy(() =>
  import('./RouletteModal').then((m) => ({ default: m.RouletteModal }))
);
const ApiKeyModal = lazy(() =>
  import('./ApiKeyModal').then((m) => ({ default: m.ApiKeyModal }))
);
const ConsoleHelpModal = lazy(() =>
  import('./ConsoleHelpModal').then((m) => ({ default: m.ConsoleHelpModal }))
);
const GameCompareModal = lazy(() =>
  import('./GameCompareModal').then((m) => ({ default: m.GameCompareModal }))
);
const SteamImportModal = lazy(() =>
  import('./SteamImportModal').then((m) => ({ default: m.SteamImportModal }))
);
const PcSpecsModal = lazy(() =>
  import('./PcSpecsModal').then((m) => ({ default: m.PcSpecsModal }))
);

export type ActiveModalType = 'specs' | 'roulette' | 'steam' | 'settings' | 'help' | null;

interface ModalLayerProps {
  activeModal: ActiveModalType;
  onCloseModal: () => void;
  onOpenModal: (modal: ActiveModalType) => void;

  selectedGame: Game | null;
  onCloseSelectedGame: () => void;
  onSelectGame: (game: Game | null) => void;

  compareGame: Game | null;
  onCloseCompareGame: () => void;
  onOpenCompare: (game: Game) => void;

  catalog: Game[];
  filteredCatalogGames: Game[];
  currentFocusedGame: Game | null;

  userPcSpecs: UserPcSpecs;
  onUpdatePcSpecs: (specs: UserPcSpecs) => void;

  getStatus: (id: number) => BacklogStatus | null;
  getRating: (id: number) => number | null;
  getNote: (id: number) => string | null;

  updateStatus: (game: Game, status: BacklogStatus | null) => void;
  updateRating: (gameId: number, rating: number) => void;
  updateNote: (gameId: number, note: string) => void;

  onImportSteamEntries: (entries: BacklogEntry[]) => void;
  onApiKeySaved: () => void;
}

export const ModalLayer: React.FC<ModalLayerProps> = ({
  activeModal,
  onCloseModal,
  onOpenModal,
  selectedGame,
  onCloseSelectedGame,
  onSelectGame,
  compareGame,
  onCloseCompareGame,
  onOpenCompare,
  catalog,
  filteredCatalogGames,
  currentFocusedGame,
  userPcSpecs,
  onUpdatePcSpecs,
  getStatus,
  getRating,
  getNote,
  updateStatus,
  updateRating,
  updateNote,
  onImportSteamEntries,
  onApiKeySaved,
}) => {
  return (
    <Suspense fallback={null}>
      {selectedGame && (
        <GameDetailsModal
          game={selectedGame}
          isOpen={Boolean(selectedGame)}
          onClose={onCloseSelectedGame}
          userStatus={getStatus(selectedGame.id)}
          userRating={getRating(selectedGame.id) ?? undefined}
          userNote={getNote(selectedGame.id) ?? undefined}
          userPcSpecs={userPcSpecs}
          onOpenPcSpecs={() => onOpenModal('specs')}
          onUpdateStatus={updateStatus}
          onUpdateRating={updateRating}
          onUpdateNote={updateNote}
          onOpenCompare={onOpenCompare}
        />
      )}

      {activeModal === 'specs' && (
        <PcSpecsModal
          isOpen={true}
          onClose={onCloseModal}
          specs={userPcSpecs}
          onUpdateSpecs={onUpdatePcSpecs}
          currentGame={currentFocusedGame}
        />
      )}

      {activeModal === 'roulette' && (
        <RouletteModal
          isOpen={true}
          onClose={onCloseModal}
          games={filteredCatalogGames}
          onSelectGame={(g) => {
            onCloseModal();
            onSelectGame(g);
          }}
        />
      )}

      {compareGame && (
        <GameCompareModal
          isOpen={true}
          onClose={onCloseCompareGame}
          gameA={compareGame}
          catalog={catalog}
          onSelectGame={(g) => {
            onCloseCompareGame();
            onSelectGame(g);
          }}
          getStatus={getStatus}
          onUpdateStatus={updateStatus}
        />
      )}

      {activeModal === 'steam' && (
        <SteamImportModal
          isOpen={true}
          onClose={onCloseModal}
          catalog={catalog}
          onImportEntries={onImportSteamEntries}
        />
      )}

      {activeModal === 'settings' && (
        <ApiKeyModal
          isOpen={true}
          onClose={onCloseModal}
          onKeySaved={onApiKeySaved}
        />
      )}

      {activeModal === 'help' && (
        <ConsoleHelpModal
          isOpen={true}
          onClose={onCloseModal}
        />
      )}
    </Suspense>
  );
};
