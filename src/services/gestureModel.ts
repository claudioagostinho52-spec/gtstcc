/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as tf from '@tensorflow/tfjs';
import { GloveData } from '../types';

class GestureModel {
  private model: tf.LayersModel | null = null;
  private labels: string[] = ['Aguardando...', 'Paz', 'Ok', 'Punho', 'Mão Aberta'];
  
  constructor() {
    this.init();
  }

  private async init() {
    // Simple mock model or setup tf.sequential
    this.model = tf.sequential({
      layers: [
        tf.layers.dense({ inputShape: [11], units: 64, activation: 'relu' }), // 5 flex + 6 IMU
        tf.layers.dense({ units: 32, activation: 'relu' }),
        tf.layers.dense({ units: 5, activation: 'softmax' })
      ]
    });
    
    this.model.compile({
      optimizer: 'adam',
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy']
    });
  }

  public async predict(data: GloveData): Promise<string> {
    if (!this.model) return 'Carregando IA...';

    const input = tf.tensor2d([[
      ...data.flex,
      data.imu.accel.x, data.imu.accel.y, data.imu.accel.z,
      data.imu.gyro.x, data.imu.gyro.y, data.imu.gyro.z
    ]]);

    const prediction = this.model.predict(input) as tf.Tensor;
    const index = (await prediction.argMax(1).data())[0];
    
    tf.dispose([input, prediction]);
    
    return this.labels[index];
  }

  // Placeholder for training logic
  public async trainOnData(data: GloveData[], label: string) {
    console.log(`Treinando gesto "${label}" com ${data.length} amostras...`);
    // In a real app, this would involve retargeting the head of the model or retraining
  }
}

export const gestureService = new GestureModel();
