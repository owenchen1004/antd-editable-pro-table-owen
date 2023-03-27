import { ESLint } from 'eslint';
import type { ScanOptions, ScanResult, PKG, Config } from '../types';
export declare const getLintConfig: (opts: ScanOptions, pkg: PKG, config: Config) => ESLint.Options;
export declare const formatResults: (results: ESLint.LintResult[], quiet: boolean) => ScanResult[];
export * from 'eslint';
