import { Box, Button, Typography } from "@mui/material";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { useGetPlayers } from "../hooks";
import {
  AddPlayerToGameFormInputs,
  PlayerOption,
  PositionOption,
  SpotOption,
  AddPlayerToGameFormProps,
  spotLabelPair,
} from "./types";
import { Player, Spot } from "../types";
import { SportPositionMap } from "../hooks/types";

const SPOT_OPTIONS = [0, 1, 2, 3];

export const AddPlayerToGameForm = ({
  gameType,
  addPlayerToGame,
  gameData,
}: AddPlayerToGameFormProps) => {
  const players = useGetPlayers();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<AddPlayerToGameFormInputs>({
    defaultValues: {
      spot: -1,
      player: null,
    },
  });

  const position = watch("position");

  const positionOptions: PositionOption[] = SportPositionMap[gameType].map(
    (position) => ({
      label: position,
      value: position,
    })
  );

  const currentPlayers =
    gameData?.find((row) => row.position === position)?.playerArray || [];
  const currentSpotsLength = currentPlayers.length;

  const playerOptions: PlayerOption[] = players
    .filter(
      (player) =>
        !currentPlayers?.some((currentPlayer) => {
          return currentPlayer.id === player.id;
        })
    )
    .map((player) => ({
      label: player.name,
      value: player,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  const spotOptions: SpotOption[] = SPOT_OPTIONS.slice(
    0,
    Math.min(currentSpotsLength + 1, SPOT_OPTIONS.length)
  ).map((spot) => ({
    label: spotLabelPair[spot],
    value: spot as Spot,
  }));

  const onSubmit: SubmitHandler<AddPlayerToGameFormInputs> = (data) => {
    addPlayerToGame({
      player: data.player as Player,
      position: data.position,
      gameType,
      spot: data.spot ?? -1,
    });
    setValue("player", null);
  };

  return (
    <>
      <Box sx={{ width: "400px" }}>
        <Typography variant="h6" color="black">
          Add Player to {gameType}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Player Select */}
          <Box mb={2}>
            <label
              style={{ display: "block", marginBottom: "4px" }}
              htmlFor="select-player"
            >
              Select Player <span style={{ color: "red" }}>*</span>
            </label>
            <Controller
              control={control}
              name="player"
              rules={{ required: "Player is required" }}
              render={({ field }) => {
                const selectedOption =
                  playerOptions.find(
                    (opt) => opt.value.id === field.value?.id
                  ) ?? null;

                return (
                  <Select<PlayerOption, false>
                    className="react-select-container"
                    inputId="select-player"
                    aria-label="Select Player"
                    options={playerOptions}
                    placeholder="Select Player"
                    isClearable
                    value={selectedOption}
                    onChange={(val) => field.onChange(val?.value ?? null)}
                  />
                );
              }}
            />
            {errors.player && (
              <span style={{ color: "red" }}>{errors.player.message}</span>
            )}
          </Box>

          {/* Position Select */}
          <Box mb={2}>
            <label
              style={{ display: "block", marginBottom: "4px" }}
              htmlFor="select-position"
            >
              Select Position <span style={{ color: "red" }}>*</span>
            </label>
            <Controller
              control={control}
              name="position"
              rules={{ required: "Position is required" }}
              render={({ field }) => {
                const selectedOption =
                  positionOptions.find((opt) => opt.value === field.value) ??
                  null;

                return (
                  <Select<PositionOption, false>
                    className="react-select-container"
                    inputId="select-position"
                    aria-label="Select Position"
                    {...field}
                    options={positionOptions}
                    placeholder="Select Position"
                    isClearable
                    value={selectedOption}
                    onChange={(val) => field.onChange(val?.value ?? null)}
                  />
                );
              }}
            />
            {errors.position && (
              <span style={{ color: "red" }}>{errors.position.message}</span>
            )}
          </Box>

          {/* Spot Select */}
          <Box mb={2}>
            <label
              style={{ display: "block", marginBottom: "4px" }}
              htmlFor="select-spot"
            >
              Select Spot
            </label>
            <Controller
              control={control}
              name="spot"
              render={({ field }) => {
                const selectedOption =
                  spotOptions.find((opt) => opt.value === field.value) ?? null;

                return (
                  <Select<SpotOption, false>
                    className="react-select-container"
                    inputId="select-spot"
                    aria-label="Select Spot"
                    options={spotOptions}
                    placeholder="Select Spot"
                    isClearable
                    value={selectedOption}
                    onChange={(val) => field.onChange(val?.value ?? -1)}
                  />
                );
              }}
            />
          </Box>

          <Button type="submit" variant="contained" disabled={!isValid}>
            Add Player
          </Button>
        </form>
      </Box>
    </>
  );
};
