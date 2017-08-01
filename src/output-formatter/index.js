import JEO from 'javascript-easy-object';

export default class OutputFormatter {

	constructor(props) {
		this.fields = props.fields
		this.onFormat = props.onFormat
		this.jeo = new JEO(props.delimitor || '.')
	}

	process(output) {
		if (!this.fields) return this.onFormat(output)
		const keys = Object.keys(this.fields)
		const result = {}
		keys.forEach(key => (result[key] = this.jeo.get(output, this.fields[key], true)))
		return this.onFormat(result)
	}

};
