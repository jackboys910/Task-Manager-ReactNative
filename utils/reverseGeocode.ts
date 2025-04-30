import { YANDEX_API_KEY } from '@env';

export const reverseGeocode = async (latitude: number, longitude: number): Promise<string> => {
  try {
    const response = await fetch(
      `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${YANDEX_API_KEY}&geocode=${longitude},${latitude}`,
    );
    const data = await response.json();
    const address =
      data.response?.GeoObjectCollection?.featureMember?.[0]?.GeoObject?.metaDataProperty
        ?.GeocoderMetaData?.text;
    return address || 'Не удалось определить адрес';
  } catch (error) {
    console.error('Ошибка обратного геокодирования:', error);
    return 'Не удалось определить адрес';
  }
};
