const { codegen } = require('swagger-axios-codegen');

const BASE_URL = 'url que esta o swagger.json';

let url = `${BASE_URL}/swagger/v2.0/swagger.json`;
console.log(`Gerando client para ${url}`);

try {
    codegen({
        methodNameMode: 'path',
        remoteUrl: url,
        useStaticMethod: true,
        strictNullChecks: false,
        modelMode: 'class',
        outputDir: `./swagger`,
    });
    // Caso seja 2 swaggers de versões diferentes a ser mapeado
    // codegen({
    //     methodNameMode: 'path',
    //     remoteUrl: url.replace('v2.0', 'v2.1'),
    //     useStaticMethod: true,
    //     strictNullChecks: false,
    //     modelMode: 'class',
    //     outputDir: `./swagger`,
    //     fileName: 'index2.ts'
    // });
} catch(err) {
    console.error(err);
}
