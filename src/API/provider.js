import { Photographer, Picture, Video } from "./classes";

export default function provider(request) {
	switch (request.element) {
		case "photographer": {
			if (request.name) {
				return new Photographer(Photographer.findOne("name", request.name))
			}
			if (request.id) {
				return new Photographer(Photographer.findById(request.id))
			}
			if (request.tags) {
				return Photographer.findByArrayContains("tags", request.tags).map((e) => new Photographer(e))
			}
			return Photographer.find().map((e) => new Photographer(e));
		}
		case "media":
			if (request.photographerId && request.type === "image") {
				return Picture.find("photographerId", request.photographerId, request.type).map((e) => new Picture(e))
			}
			if (request.photographerId && request.type === "video") {
				return Video.find("photographerId", request.photographerId, request.type).map((e) => new Video(e))
			}
			if (request.photographerId && request.type === "all") {
				return Picture.find("photographerId", request.photographerId, "image").map((e) => new Picture(e))
					.concat(Video.find("photographerId", request.photographerId, "video").map((e) => new Video(e)))
			}
			break;
		case "tags": {
			const tagsDuplicated = Photographer.find().map((e) => e.tags).flat();
			return tagsDuplicated.filter((e,i) => tagsDuplicated.indexOf(e) === i)
		}
		default:
			break;
	}
}