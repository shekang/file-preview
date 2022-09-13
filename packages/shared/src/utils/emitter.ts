import type {listenerAdded, listenerRemoved} from 'emittery';
import Emittery from 'emittery';

type Instance = Emittery<
Record<PropertyKey, any>,
Record<PropertyKey, any> & {
	[listenerAdded]: Emittery.ListenerChangedData;
	[listenerRemoved]: Emittery.ListenerChangedData;
},
string | number | symbol
>;

export const emitter = (function () {
	let instance: Instance;
	return {
		getInstance() {
			if (!instance) {
				instance = new Emittery();
			}

			return instance;
		},
	};
})();
