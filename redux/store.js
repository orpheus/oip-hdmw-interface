import {createStore, applyMiddleware, compose, combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import {Interface, Settings} from './reducers'


export const initialState = {
	wallet: undefined,
	discover: false,
	balances: undefined,
	exchangeRates: undefined,
	
	activeCoinName: 'bitcoin',
	
	bitcoin: {
		addresses: 1,
		accounts: 1,
		activeAccount: 0,
		activeChain: 0,
		activeAddress: 0,
	},
	flo: {
		addresses: 1,
		accounts: 1,
		activeAccount: 0,
		activeChain: 0,
		activeAddress: 0,
	},
	litecoin: {
		addresses: 1,
		accounts: 1,
		activeAccount: 0,
		activeChain: 0,
		activeAddress: 0,
	},
	
	displayAddresses: true,
	displayTransactions: false,
	
	displayView: 'addresses',
}

// Create our Store
const createStoreFn = (initialState = initialState) => {
	const reducers = {
		Interface,
		Settings
	}
	
	// Create the logger to log Actions to the console
	const logger = createLogger({
		collapsed: true
	});
	
	// Create Redux Middleware
	let middleware = [logger, thunkMiddleware];
	
	let composeEnhancers
	
	// Compose a "name" for the window.
	if (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
		composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
			name: "oip-hdmw"
		})
	} else {
		composeEnhancers = compose
	}
	
	// Use the Middlewear and create an "enhancer"
	const enhancer = composeEnhancers(
		applyMiddleware(...middleware),
		// other store enhancers if any
	);
	
	return createStore(combineReducers(reducers), initialState, enhancer)
}

export {
	createStoreFn as createStore
}