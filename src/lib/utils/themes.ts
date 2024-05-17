export enum ThemeName {
	dune = 'dune',
	green_tomato = 'green_tomato'
}

export function changeTheme(target: ThemeName) {
	const root = document.getElementById('html-root');
	root?.setAttribute('data-theme', target);
}
