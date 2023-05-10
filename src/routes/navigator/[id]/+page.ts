import { placemarkService } from "../../../services/placemark-service";
import type { Placemark } from "../../../services/placemark-types";
import { generateMarkerSpec } from "../../../services/placemark-utils";
import type { PageLoad } from "./$types";

export const ssr = false;

export const load: PageLoad = async ({ params }) => {
  const placemark: Placemark = await placemarkService.getPlacemark(encodeURI(params.id));
  const marker = generateMarkerSpec(placemark);
  return {
    placemark,
    marker,
    markerLayers: {
      title: placemark.name,
      markerSpecs: [marker]
    }
  }
}