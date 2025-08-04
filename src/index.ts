import fetch from 'node-fetch';
import {
  VinInput,
  SpecsInput,
  PlateDecoderParams,
  ImageInput,
  ObdcodesdecoderInput,
  YearMakeModelInput,
  PlateImageRecognitionInput,
  VinOcrInput,
} from './types';

export const Greeter = (name: string) => `CarsXE API says hello ${name}!`;

export class CarsXE {
  constructor(private apiKey: string) {}

  private getBaseUrl() {
    return 'https://api.carsxe.com';
  }

  private buildUrl(endpoint: string, params: Record<string, any>) {
    const url = new URL(`${this.getBaseUrl()}/${endpoint}`);
    url.searchParams.append('key', this.apiKey);
    url.searchParams.append('source', 'npm');
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        url.searchParams.append(key, value);
      }
    }
    return url.toString();
  }

  public async specs(params: SpecsInput) {
    const res = await fetch(this.buildUrl('specs', { ...params }));
    return res.json();
  }

  public async marketvalue(params: VinInput) {
    const res = await fetch(this.buildUrl('v2/marketvalue', { ...params }));
    return res.json();
  }

  public async history(params: VinInput) {
    const res = await fetch(this.buildUrl('history', { ...params }));
    return res.json();
  }

  public async recalls(params: VinInput) {
    const res = await fetch(this.buildUrl('v1/recalls', { ...params }));
    return res.json();
  }

  public async internationalVinDecoder(params: VinInput) {
    const res = await fetch(this.buildUrl('v1/international-vin-decoder', { ...params }));
    return res.json();
  }

  public async platedecoder(params: PlateDecoderParams) {
    const res = await fetch(this.buildUrl('v2/platedecoder', { ...params }));
    return res.json();
  }

  public async plateImageRecognition(params: PlateImageRecognitionInput) {
    const url = new URL(`${this.getBaseUrl()}/platerecognition`);
    url.searchParams.append('key', this.apiKey);
    url.searchParams.append('source', 'npm');
    const res = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: params.imageUrl,
      }),
    });
    return res.json();
  }

  public async vinOcr(params: VinOcrInput) {
    const url = new URL(`${this.getBaseUrl()}/v1/vinocr`);
    url.searchParams.append('key', this.apiKey);
    url.searchParams.append('source', 'npm');
    const res = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: params.imageUrl,
      }),
    });
    console.log('Request URL:', url.toString());
    return res.json();
  }

  public async yearMakeModel(params: YearMakeModelInput) {
    const res = await fetch(this.buildUrl('v1/ymm', { ...params }));
    return res.json();
  }

  public async images(params: ImageInput) {
    const res = await fetch(this.buildUrl('images', { ...params }));
    return res.json();
  }

  public async obdcodesdecoder(params: ObdcodesdecoderInput) {
    const res = await fetch(this.buildUrl('obdcodesdecoder', { ...params }));
    return res.json();
  }
}

export default CarsXE;
