import React, {useEffect} from 'react';
import Head from "next/head";

declare var DocumentTouch;
declare var WebFont;

export default function App({Component, pageProps}) {
	useEffect(() => {
		if (typeof document !== 'undefined' && typeof window !== 'undefined') {
			WebFont.load({
				google: {
					families: ["Lato:100,100italic,300,300italic,400,400italic,700,700italic,900,900italic", "Open Sans:300,300italic,400,400italic,600,600italic,700,700italic,800,800italic", "Inconsolata:400,700", "Ubuntu:300,300italic,400,400italic,500,500italic,700,700italic", "Merriweather:300,300italic,400,400italic,700,700italic,900,900italic", "Source Sans Pro:300,regular,600,700:latin-ext,latin", "Encode Sans:regular,600", "Encode Sans Semi Condensed:regular", "Yantramanav:300,regular,500", "Cabin:regular,500", "Cabin Condensed:regular"]
				}
			});
			const o = window as any;
			const c = document as any;
			const n = c.documentElement, t = " w-mod-";
			n.className += t + "js";
			("ontouchstart" in o || o.DocumentTouch && c instanceof DocumentTouch) && (n.className += t + "touch")
		}
	});
	return <>
		<Head>
			<title>Ben Herila</title>
			<meta content="Ben Herila" property="og:title"/>
			<meta content="Ben Herila" property="twitter:title"/>
			<meta content="width=device-width, initial-scale=1" name="viewport"/>
			<link href="/css/normalize.css" rel="stylesheet" type="text/css"/>
			<link href="/css/webflow.css" rel="stylesheet" type="text/css"/>
			<link href="/css/ben-herila.webflow.css" rel="stylesheet" type="text/css"/>
			<script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js" type="text/javascript"></script>
			{'<!-- [if lt IE 9]><script src="https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.min.js" type="text/javascript"></script><![endif] -->'}
		</Head>
		<Component {...pageProps} />
	</>;
}
