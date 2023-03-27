import execa from 'execa';
export declare const getCommitFiles: (options?: execa.Options) => Promise<string[]>;
export declare const getAmendFiles: (options?: execa.Options) => Promise<string>;
