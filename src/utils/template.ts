const regex: RegExp = /\{\{([^}]*)}}/g;
const evalRegex: RegExp = /\$\{(.*?)(?!}$)\}\$/g;

export const parseTemplate = (expr: string) :Function => {
    return (data: Object|string[], showVarIfNull: boolean = true) => {
        let i: number = 0;
        let parsed :string = expr
            .replaceAll('\n', '')
            .replace(evalRegex, (s: string, p1: string) => {
                // Indirect eval
                // https://esbuild.github.io/content-types/#direct-eval
                return (new Function('env', `return ${p1.replaceAll('./', 'env.')}`))(data);
            });

        return parsed.replace(regex, (s: string, p1: string) => {
            if (Array.isArray(data)) {
                return (data as any)[p1 || i++] || (showVarIfNull ? s : '');
            }
            // Get property of object using a string with dot notation
            return p1.split('.').reduce((o: Object, i: string) => (o as any)[i] ?? (showVarIfNull ? s : ''), data || {});
        });
    };
};
