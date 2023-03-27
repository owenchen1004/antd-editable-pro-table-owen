import { ESLint } from 'eslint';
import stylelint from 'stylelint';
import markdownlint from 'markdownlint';
export interface PKG {
    eslintConfig?: any;
    eslintIgnore?: string[];
    stylelint?: any;
    peerDependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
    dependencies?: Record<string, string>;
    [key: string]: any;
}
export interface Config {
    enableStylelint?: boolean;
    enableMarkdownlint?: boolean;
    enablePrettier?: boolean;
}
export interface ScanOptions {
    cwd: string;
    include: string;
    files?: string[];
    quiet?: boolean;
    ignore?: boolean;
    fix?: boolean;
    outputReport?: boolean;
}
export interface ScanResult {
    filePath: string;
    errorCount: number;
    warningCount: number;
    fixableErrorCount: number;
    fixableWarningCount: number;
    messages: Array<{
        line: number;
        column: number;
        rule: string;
        url: string;
        message: string;
        errored: boolean;
    }>;
}
export interface ScanReport {
    results: ScanResult[];
    errorCount: number;
    warningCount: number;
    runErrors: Error[];
}
export interface InitOptions {
    cwd: string;
    checkVersionUpdate: boolean;
    rewriteConfig?: boolean;
    eslintType?: string;
    enableStylelint?: boolean;
    enableMarkdownlint?: boolean;
    enablePrettier?: boolean;
    disableNpmInstall?: boolean;
}
export interface IGetLintConfig {
    (options: ScanOptions, pkg: PKG, config: Config): ESLint.Options;
    (options: ScanOptions, pkg: PKG, config: Config): stylelint.LinterOptions;
    (options: ScanOptions, pkg: PKG, config: Config): markdownlint.Options;
}
export interface IFormatResults {
    (results: ESLint.LintResult[], quiet: boolean): ScanResult[];
    (results: stylelint.LintResult[], quiet: boolean): ScanResult[];
    (results: markdownlint.LintResults, quiet: boolean): ScanResult[];
}
