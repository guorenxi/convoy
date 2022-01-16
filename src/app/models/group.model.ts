export interface GROUP {
	id: string;
	name: string;
	logo_url: string;
	config: {
		strategy: {
			type: string;
			default: {
				intervalSeconds: number;
				retryLimit: number;
			};
		};
		signature: {
			header: string;
			hash: string;
		};
		disable_endpoint: boolean;
	};
	created_at: Date;
	updated_at: Date;
}
