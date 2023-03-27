import markdownLint from 'markdownlint';
import type { ScanOptions, ScanResult } from '../types';
declare type LintOptions = markdownLint.Options & {
    fix?: boolean;
};
export declare const getLintConfig: (opts: ScanOptions) => LintOptions;
export declare const formatResults: (results: markdownLint.LintResults, quiet: boolean) => ScanResult[];
export declare const lint: (options: LintOptions) => Promise<markdownLint.LintResults>;
export {};
