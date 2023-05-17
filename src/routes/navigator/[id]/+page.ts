import { placemarkService } from "../../../services/placemark-service";
import type { Placemark } from "../../../services/placemark-types";
import type { PageLoad } from "./$types";

export const ssr = false;

export const load: PageLoad = async ({ params }) => {
  placemarkService.reload();
  const placemark: Placemark = await placemarkService.getPlacemark(encodeURI(params.id));
  return {
    placemark,
    markerLayers: {
      title: placemark.name,
    }
  }
}