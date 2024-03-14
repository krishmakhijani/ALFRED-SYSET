"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const algoliasearch_1 = __importDefault(require("algoliasearch"));
const alfy_1 = __importDefault(require("alfy"));
const alfredNotifier = require('alfred-notifier');
alfredNotifier();
const client = algoliasearch_1.default('BH4D9OD16A', '60ac2c1a7d26ab713757e4a081e133d0');
const index = client.initIndex('ant_design');
const fetchWithCache = async (searchText) => {
    const cachedItems = alfy_1.default.cache.get(searchText);
    if (cachedItems)
        return cachedItems;
    const { hits } = await index.search(searchText, {
        hitsPerPage: 20,
        facetFilters: ['tags:en'],
    });
    const filteredHits = hits.filter((hit) => hit.anchor === 'header');
    const items = filteredHits.map((hit) => {
        var _a, _b;
        return ({
            title: (_a = hit.hierarchy.lvl1) !== null && _a !== void 0 ? _a : '',
            subtitle: (_b = hit.hierarchy.lvl0) !== null && _b !== void 0 ? _b : '',
            arg: hit.url,
        });
    });
    alfy_1.default.cache.set(searchText, items, { maxAge: 1000 * 60 * 60 });
    return items;
};
const start = async () => {
    const searchText = alfy_1.default.input;
    const items = await fetchWithCache(searchText);
    alfy_1.default.output(items);
};
start();
//# sourceMappingURL=index.js.map