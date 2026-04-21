/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface IMUData {
  accel: { x: number; y: number; z: number };
  gyro: { x: number; y: number; z: number };
}

export interface GloveData {
  flex: number[]; // 5 flex sensors (0-100 or normalized 0-1)
  imu: IMUData;
  timestamp: number;
}

export interface GestureDefinition {
  id: string;
  name: string;
  flexValues: number[];
  imuValues: IMUData;
}

export type AppView = 'home' | 'translator' | 'about';
