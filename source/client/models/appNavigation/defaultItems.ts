import text 				from "@system/text";

export default [
	{
		key: "projects",
		caption: text('Projects'),
		icon: "appstore-o",
	},
	{
		key: "boilerplates",
		caption: text('Boilerplates'),
		icon: "code-o",
	},
	{
		key: "settings",
		caption: text('Settings'),
		icon: "setting",
	},

	{
		key: "project-new",
		icon: "folder-add",
		data: { id: "new" },
		caption: text('New project'),
		parent: "projects",
	},
	{
		key: "project-1",
		icon: "folder",
		data: { id: 1 },
		caption: 'Some project',
		parent: "projects",
	},
	{
		key: "boilerplate-new",
		icon: "file-add",
		data: { id: "new" },
		caption: text('New boilerplate'),
		parent: "boilerplates",
	}
]