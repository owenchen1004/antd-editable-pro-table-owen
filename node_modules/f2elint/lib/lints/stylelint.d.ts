import { LinterOptions, LintResult } from 'stylelint';
import type { ScanOptions, ScanResult, PKG, Config } from '../types';
export declare const getLintConfig: (opts: ScanOptions, pkg: PKG, config: Config) => LinterOptions;
export declare const formatResults: (results: LintResult[], quiet: boolean) => ScanResult[];
export * from 'stylelint';
