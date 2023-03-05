import data from './data.json';

class ProfilePicture {
	constructor(props) {
		this.link = "Media/Photographers ID Photos/" + props.file;
	}
}

class AbstractDB {
	static table;

	static findById (id) {
		return this.table.filter((e) => e.id == id)[0]
	}
	static findOne (property, value) {
		const res = this.table.filter((e) => e[property] == value);
		return res.length > 0 ? res[0] : null;
	}
	static find (property, value, type) {
		if (!property && !value)
			return this.table;
		let res = this.table.filter((e) => e[property] == value);
		if(type) {
			res = res.filter((e) => e[type])
		}
		return res.length == 0 ? null : res;
	}
	static findByArrayContains (property, value) {
		const res = this.table.filter((e) => e[property].includes(value));
		return res.length == 0 ? null : res;
	}
}

class Media extends AbstractDB{
	static table = data.media;
	constructor(props) {
		super();
		this.title = props.title
		this.photographerId = props.photographerId
		this.tags = props.tags
		this.likes = props.likes
		this.date = new Date(props.date)
		this.price = props.price
		this.link = "Media/Content/"
	}
}

export class Photographer extends AbstractDB {
	static table = data.photographers;
	constructor(props) {
		super();
		this.portrait = new ProfilePicture({ file: props.portrait })
		this.name = props.name
		this.city = props.city
		this.country = props.country
		this.tags = props.tags
		this.tagline = props.tagline
		this.price = props.price
		this.id = props.id
	}
}

export class Picture extends Media {
	constructor(props) {
		super(props);
		this.file = props.image
		this.media = 'photo'
	}
}

export class Video extends Media {
	constructor(props) {
		super(props);
		this.file = props.video
		this.media = 'video'
		const dotSplit = props.video.split(".");
		this.type = "video/" + dotSplit[dotSplit.length - 1];
	}
}