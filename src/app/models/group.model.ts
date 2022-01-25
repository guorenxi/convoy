export interface GROUP {
	id: string;
	convoy_id: string;
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
	group_api_keys: any;
	key: any;
	statistics: {
		messages_sent: number;
		total_apps: number;
	};
	created_at: Date;
	updated_at: Date;
	selected: boolean;
}
