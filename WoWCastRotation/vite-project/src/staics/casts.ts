type PassiveObject = {
  id: Passive;
  name: string;
  chance: number;
  extra: Extra;
  condition: Condition;
};

export type Passive = "free_cast";

export const passive: Record<Passive, PassiveObject> = {
  free_cast: {
    id: "free_cast",
    name: "Free Cast",
    chance: 0.08,
    extra: {
      free_cast: true,
    },
    condition: [],
  },
};

type BuffObject = {
  max_stack: number;
  effect: Record<string, number>;
};

export type Buffs = "arcan_charge";

export const buffs: Record<Buffs, BuffObject> = {
  arcan_charge: {
    max_stack: 4,
    effect: {
      damage: 0.76,
      cast_time: 0.08,
      mana_use: 1,
    },
  },
};
export type CastObject = {
  id: Casts;
  name: string;
  cast_time: number;
  channal: number;
  gcd: boolean;
  cd: number;
  stack: number;
  extra: Extra;
  condition: Condition[];
};

type Extra = Partial<Record<Buffs & Passive, number>>;

type Condition = Array<Buffs & Passive>;

export type Casts =
  | "arcan_blast"
  | "arcan_barrage"
  | "arcane_missiles"
  | "mirror_image"
  | "evocation"
  | "arcane_surge"
  | "touch_of_the_magi";

export const casts: Record<Casts, CastObject> = {
  arcan_blast: {
    id: "arcan_blast",
    name: "Arcane Blast",
    cast_time: 2000,
    channal: 0,
    gcd: true,
    cd: 0,
    stack: 0,
    extra: {
      arcan_charge: 1,
    },
    condition: [],
  },
  arcan_barrage: {
    id: "arcan_barrage",
    name: "Arcane Barrage",
    cast_time: 0,
    channal: 0,
    gcd: true,
    cd: 0,
    stack: 0,
    extra: {
      arcan_charge: -4,
    },
    condition: [],
  },
  arcane_missiles: {
    id: "arcane_missiles",
    name: "Arcane Missiles",
    cast_time: 0,
    channal: 2200,
    gcd: true,
    cd: 0,
    stack: 0,
    extra: {
      free_cast: false,
    },
    condition: ["free_cast" as unknown as Condition],
  },
  mirror_image: {
    id: "mirror_image",
    name: "Mirror Image",
    cast_time: 0,
    channal: 0,
    gcd: true,
    cd: 120000,
    stack: 0,
    extra: {},
    condition: [],
  },
  evocation: {
    id: "evocation",
    name: "Evocation",
    cast_time: 0,
    channal: 13200,
    gcd: true,
    cd: 90000,
    stack: 0,
    extra: {
      free_cast: true,
    },
    condition: [],
  },
  arcane_surge: {
    id: "arcane_surge",
    name: "Arcane Surge",
    cast_time: 13200,
    channal: 0,
    gcd: true,
    cd: 90000,
    stack: 0,
    extra: {
      free_cast: true,
    },
    condition: [],
  },
  touch_of_the_magi: {
    id: "touch_of_the_magi",
    name: "Touch of the Magi",
    cast_time: 0,
    channal: 0,
    gcd: true,
    cd: 45000,
    stack: 0,
    extra: {},
    condition: [],
  },
};
