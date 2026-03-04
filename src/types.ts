export interface Governorate {
  id: number;
  code: string;
  name: string;
  nameEn: string;
}

export interface City {
  id: number;
  name: string;
  nameEn: string;
  governorateCode: string;
}

export interface PhoneAreaEntry {
  code: string;
  region: string;
  regionEn: string;
}
