declare module 'mdsvex' {
	export interface MdsvexCompileOptions {
		remarkPlugins?: any[];
		rehypePlugins?: any[];
		smartypants?:
			| boolean
			| {
					dashes?: 'oldschool' | 'inverted' | false;
					ellipses?: boolean;
					quotes?: boolean;
					backticks?: boolean;
			  };
	}

	export interface CompileResult {
		code: any;
		data?: {
			fm?: Record<string, any>;
		};
		map?: any;
		dependencies?: string[];
	}

	export function compile(
		content: string,
		options?: MdsvexCompileOptions
	): Promise<CompileResult | null>;

	export function defineConfig(config: MdsvexCompileOptions): MdsvexCompileOptions;
}
