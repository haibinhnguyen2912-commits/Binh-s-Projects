
export enum VortexPosition {
  CENTER = 'CENTER',
  INNER_EDGE = 'INNER_EDGE',
  OUTER_FLOW = 'OUTER_FLOW'
}

export interface PositionConfig {
  radius: number;
  label: string;
  description: string;
  isRotational: boolean;
}

export const POSITION_MAP: Record<VortexPosition, PositionConfig> = {
  [VortexPosition.CENTER]: {
    radius: 40,
    label: 'Near Center (Inner)',
    description: 'Inside the vortex core. Velocity is low but increasing with distance from the center. Solid-body rotation causes local rotation.',
    isRotational: true
  },
  [VortexPosition.INNER_EDGE]: {
    radius: 120,
    label: 'Vortex Edge (Inner)',
    description: 'At the periphery of the core. Velocity is at its peak. The fluid still exhibits significant local rotation (curl).',
    isRotational: true
  },
  [VortexPosition.OUTER_FLOW]: {
    radius: 220,
    label: 'Farther Out (Outer)',
    description: 'Outside the vortex core. Velocity decreases as 1/r. While there is bulk rotation, the local rotation (curl) is zero.',
    isRotational: false
  }
};
