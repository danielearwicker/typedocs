/// <reference path="typings/node/node.d.ts" />
/// <reference path="typings/typescript/typescript.d.ts" />

import ts = require("typescript");
import fs = require("fs");
import path = require("path");

function indent(depth: number) {
    return new Array(depth + 1).join("  ");
}

var propertyBlackList: { [key: string]: boolean } = {};
["parent"].forEach(k => propertyBlackList[k] = true);

function prettyPrint(val: any, depth: number, limit: number, prefix: string) {
    if (depth === limit) {
        return;
    }
    if (typeof val === "object") {
        console.log(indent(depth) + prefix);
        Object.keys(val).forEach(k => {
            if (!propertyBlackList[k]) {
                prettyPrint(val[k], depth + 1, limit, k);
            }
        });
    } else {
        console.log(indent(depth) + prefix + " = " + val);
    }
}

enum SyntaxKindNames {
    Unknown = 0,
    EndOfFileToken = 1,
    SingleLineCommentTrivia = 2,
    MultiLineCommentTrivia = 3,
    NewLineTrivia = 4,
    WhitespaceTrivia = 5,
    NumericLiteral = 6,
    StringLiteral = 7,
    RegularExpressionLiteral = 8,
    NoSubstitutionTemplateLiteral = 9,
    TemplateHead = 10,
    TemplateMiddle = 11,
    TemplateTail = 12,
    OpenBraceToken = 13,
    CloseBraceToken = 14,
    OpenParenToken = 15,
    CloseParenToken = 16,
    OpenBracketToken = 17,
    CloseBracketToken = 18,
    DotToken = 19,
    DotDotDotToken = 20,
    SemicolonToken = 21,
    CommaToken = 22,
    LessThanToken = 23,
    GreaterThanToken = 24,
    LessThanEqualsToken = 25,
    GreaterThanEqualsToken = 26,
    EqualsEqualsToken = 27,
    ExclamationEqualsToken = 28,
    EqualsEqualsEqualsToken = 29,
    ExclamationEqualsEqualsToken = 30,
    EqualsGreaterThanToken = 31,
    PlusToken = 32,
    MinusToken = 33,
    AsteriskToken = 34,
    SlashToken = 35,
    PercentToken = 36,
    PlusPlusToken = 37,
    MinusMinusToken = 38,
    LessThanLessThanToken = 39,
    GreaterThanGreaterThanToken = 40,
    GreaterThanGreaterThanGreaterThanToken = 41,
    AmpersandToken = 42,
    BarToken = 43,
    CaretToken = 44,
    ExclamationToken = 45,
    TildeToken = 46,
    AmpersandAmpersandToken = 47,
    BarBarToken = 48,
    QuestionToken = 49,
    ColonToken = 50,
    EqualsToken = 51,
    PlusEqualsToken = 52,
    MinusEqualsToken = 53,
    AsteriskEqualsToken = 54,
    SlashEqualsToken = 55,
    PercentEqualsToken = 56,
    LessThanLessThanEqualsToken = 57,
    GreaterThanGreaterThanEqualsToken = 58,
    GreaterThanGreaterThanGreaterThanEqualsToken = 59,
    AmpersandEqualsToken = 60,
    BarEqualsToken = 61,
    CaretEqualsToken = 62,
    Identifier = 63,
    BreakKeyword = 64,
    CaseKeyword = 65,
    CatchKeyword = 66,
    ClassKeyword = 67,
    ConstKeyword = 68,
    ContinueKeyword = 69,
    DebuggerKeyword = 70,
    DefaultKeyword = 71,
    DeleteKeyword = 72,
    DoKeyword = 73,
    ElseKeyword = 74,
    EnumKeyword = 75,
    ExportKeyword = 76,
    ExtendsKeyword = 77,
    FalseKeyword = 78,
    FinallyKeyword = 79,
    ForKeyword = 80,
    FunctionKeyword = 81,
    IfKeyword = 82,
    ImportKeyword = 83,
    InKeyword = 84,
    InstanceOfKeyword = 85,
    NewKeyword = 86,
    NullKeyword = 87,
    ReturnKeyword = 88,
    SuperKeyword = 89,
    SwitchKeyword = 90,
    ThisKeyword = 91,
    ThrowKeyword = 92,
    TrueKeyword = 93,
    TryKeyword = 94,
    TypeOfKeyword = 95,
    VarKeyword = 96,
    VoidKeyword = 97,
    WhileKeyword = 98,
    WithKeyword = 99,
    ImplementsKeyword = 100,
    InterfaceKeyword = 101,
    LetKeyword = 102,
    PackageKeyword = 103,
    PrivateKeyword = 104,
    ProtectedKeyword = 105,
    PublicKeyword = 106,
    StaticKeyword = 107,
    YieldKeyword = 108,
    AnyKeyword = 109,
    BooleanKeyword = 110,
    ConstructorKeyword = 111,
    DeclareKeyword = 112,
    GetKeyword = 113,
    ModuleKeyword = 114,
    RequireKeyword = 115,
    NumberKeyword = 116,
    SetKeyword = 117,
    StringKeyword = 118,
    TypeKeyword = 119,
    QualifiedName = 120,
    ComputedPropertyName = 121,
    TypeParameter = 122,
    Parameter = 123,
    Property = 124,
    Method = 125,
    Constructor = 126,
    GetAccessor = 127,
    SetAccessor = 128,
    CallSignature = 129,
    ConstructSignature = 130,
    IndexSignature = 131,
    TypeReference = 132,
    FunctionType = 133,
    ConstructorType = 134,
    TypeQuery = 135,
    TypeLiteral = 136,
    ArrayType = 137,
    TupleType = 138,
    UnionType = 139,
    ParenthesizedType = 140,
    ArrayLiteralExpression = 141,
    ObjectLiteralExpression = 142,
    PropertyAccessExpression = 143,
    ElementAccessExpression = 144,
    CallExpression = 145,
    NewExpression = 146,
    TaggedTemplateExpression = 147,
    TypeAssertionExpression = 148,
    ParenthesizedExpression = 149,
    FunctionExpression = 150,
    ArrowFunction = 151,
    DeleteExpression = 152,
    TypeOfExpression = 153,
    VoidExpression = 154,
    PrefixUnaryExpression = 155,
    PostfixUnaryExpression = 156,
    BinaryExpression = 157,
    ConditionalExpression = 158,
    TemplateExpression = 159,
    YieldExpression = 160,
    OmittedExpression = 161,
    TemplateSpan = 162,
    Block = 163,
    VariableStatement = 164,
    EmptyStatement = 165,
    ExpressionStatement = 166,
    IfStatement = 167,
    DoStatement = 168,
    WhileStatement = 169,
    ForStatement = 170,
    ForInStatement = 171,
    ContinueStatement = 172,
    BreakStatement = 173,
    ReturnStatement = 174,
    WithStatement = 175,
    SwitchStatement = 176,
    LabeledStatement = 177,
    ThrowStatement = 178,
    TryStatement = 179,
    TryBlock = 180,
    FinallyBlock = 181,
    DebuggerStatement = 182,
    VariableDeclaration = 183,
    FunctionDeclaration = 184,
    ClassDeclaration = 185,
    InterfaceDeclaration = 186,
    TypeAliasDeclaration = 187,
    EnumDeclaration = 188,
    ModuleDeclaration = 189,
    ModuleBlock = 190,
    ImportDeclaration = 191,
    ExportAssignment = 192,
    ExternalModuleReference = 193,
    CaseClause = 194,
    DefaultClause = 195,
    HeritageClause = 196,
    CatchClause = 197,
    PropertyAssignment = 198,
    ShorthandPropertyAssignment = 199,
    EnumMember = 200,
    SourceFile = 201,
    Program = 202,
    SyntaxList = 203,
    Count = 204,
    FirstAssignment = 51,
    LastAssignment = 62,
    FirstReservedWord = 64,
    LastReservedWord = 99,
    FirstKeyword = 64,
    LastKeyword = 119,
    FirstFutureReservedWord = 100,
    LastFutureReservedWord = 108,
    FirstTypeNode = 132,
    LastTypeNode = 140,
    FirstPunctuation = 13,
    LastPunctuation = 62,
    FirstToken = 0,
    LastToken = 119,
    FirstTriviaToken = 2,
    LastTriviaToken = 5,
    FirstLiteralToken = 6,
    LastLiteralToken = 9,
    FirstTemplateToken = 9,
    LastTemplateToken = 12,
    FirstOperator = 21,
    LastOperator = 62,
    FirstBinaryOperator = 23,
    LastBinaryOperator = 62,
    FirstNode = 120,
}

function printNodes(node: ts.Node, depth: number) {
    console.log(indent(depth) + "node: " + SyntaxKindNames[node.kind])
    ts.forEachChild(node, child => printNodes(child, depth + 1));
}

function isExported(node: ts.Node) {
    return (node.flags & ts.NodeFlags.Export) !== 0;
}

function search(node: ts.Node,
                each: (descendent: ts.Node) => boolean,
                depth: number) {

    ts.forEachChild(node, child => {
        if (each(child) !== false) {
            search(child, each, depth + 1);
        }
    });
}

var filesExcluded: { [name: string]: boolean } = {};

function forEachFilteredNode<T extends ts.Node>(
    nodes: T[],
    filePrefix: string,
    each: (node: T) => void
) {
    nodes.forEach(n => {
        var fileName = n.getSourceFile().filename;
        if (fileName.startsWith(filePrefix)) {
            each(n);
        } else {
            filesExcluded[fileName] = true;
        }
    });
}

interface VariableLikeDeclaration extends ts.Declaration {
    type?: ts.TypeNode;
}

function getDeclarationName(decl: ts.Declaration) {
    var i = <ts.Identifier>decl.name;
    if (i.text) {
        return i.text;
    }

    var l = <ts.LiteralExpression>decl.name;
    if (l.text) {
        return l.text;
    }

    return "(expression)";
}

function getDeclarationPath(decl: ts.Declaration) {
    var path: string[] = [];
    for (var node = decl.parent; !!node; node = node.parent) {
        var d = <ts.Declaration>node;
        if (d.name) {
            path.push(getDeclarationName(d) + ":" + SyntaxKindNames[d.kind]);
        }
    }
    return path.join(".");
}

class Members {
    variables: VariableLikeDeclaration[] = [];
    functions: ts.FunctionLikeDeclaration[] = [];
    contributingFiles: { [path: string]: boolean } = {};

    add(node: ts.Node, depth: number, file: string,
        handler?: (node: ts.Node) => boolean) {

        this.contributingFiles[file] = true;
        search(node, child => {
            switch(child.kind) {
                case ts.SyntaxKind.VariableDeclaration:
                case ts.SyntaxKind.Property:
                    this.variables.push(<VariableLikeDeclaration>child);
                    return false;
                case ts.SyntaxKind.FunctionDeclaration:
                case ts.SyntaxKind.Method:
                    this.functions.push(<ts.FunctionLikeDeclaration>child);
                    return false;
            }
            return handler ? handler(child) : true;
        }, depth);
    }

    print(depth: number, filePrefix: string) {
        forEachFilteredNode(this.variables, filePrefix, v =>
            console.log(indent(depth) + "variable " + getDeclarationName(v) +
            " (" + getDeclarationPath(v) + ")"));
        forEachFilteredNode(this.functions, filePrefix, f =>
            console.log(indent(depth) + "function " + getDeclarationName(f)));
    }

    filter(filePrefix: string) {
        return Object.keys(this.contributingFiles).some(path => {
            if (path.startsWith(filePrefix)) {
                return true;
            }
            filesExcluded[path] = true;
            return false;
        });
    }
}

class Interface extends Members {}
class Class extends Members {}

function getOrCreate<T>(from: { [name:string]: T }, name: string, create: () => T) {
    return from[name] || (from[name] = create());
}

function forEach<T extends Members>(
    from: { [name:string]: T },
    filePrefix: string,
    each: (name: string, item: T) => void) {
    Object.keys(from).forEach(key => {
        var item = from[key];
        if (item.filter(filePrefix)) {
            each(key, from[key]);
        }
    });
}

class Module extends Members {
    modules: { [name: string]: Module } = {};
    interfaces: { [name: string]: Interface } = {};
    classes: { [name: string]: Class } = {};

    add(node: ts.Node, depth: number, file: string) {
        super.add(node, depth, file, child => {
            switch (child.kind) {
                case ts.SyntaxKind.ModuleDeclaration:
                    var md = <ts.ModuleDeclaration>child;
                    getOrCreate(this.modules, md.name.text,
                        () => new Module()).add(md, depth + 1, file);
                    return false;
                case ts.SyntaxKind.InterfaceDeclaration:
                    var id = <ts.InterfaceDeclaration>child;
                    getOrCreate(this.interfaces, id.name.text,
                        () => new Interface()).add(id, depth + 1, file);
                    return false;
                case ts.SyntaxKind.ClassDeclaration:
                    var cd = <ts.ClassDeclaration>child;
                    getOrCreate(this.classes, cd.name.text,
                        () => new Class()).add(cd, depth + 1, file);
                    return false;
            }
        });
    }

    print(depth: number, filePrefix: string) {
        forEach(this.modules, filePrefix, (name, module) => {
            console.log(indent(depth) + "module " + name);
            module.print(depth + 1, filePrefix);
        });

        forEach(this.interfaces, filePrefix, (name, interface) => {
            console.log(indent(depth) + "interface " + name);
            interface.print(depth + 1, filePrefix);
        });

        forEach(this.classes, filePrefix, (name, cls) => {
            console.log(indent(depth) + "class " + name);
            cls.print(depth + 1, filePrefix);
        });

        super.print(depth, filePrefix);
    }
}

var globals = new Module();

class ExternalModule extends Module {
    constructor(public path: string) {
        super();
    }
}

var externals: ExternalModule[] = [];

var inputPath = process.argv[2];
if (!inputPath.endsWith(path.sep)) {
    inputPath += path.sep;
}

export function scan(sourceFile: ts.SourceFile) {
    if (sourceFile.statements.some(isExported)) {
        var path = sourceFile.filename;
        if (path.startsWith(inputPath)) {
            path = path.substr(inputPath.length);
        }
        var mod = new ExternalModule(path);
        mod.add(sourceFile, 1, sourceFile.filename);
        externals.push(mod);
    } else {
        globals.add(sourceFile, 1, sourceFile.filename);
    }
}

var fileNames = [];

function recurseFiles(p: string) {
    if (fs.statSync(p).isDirectory()) {
        fs.readdirSync(p).forEach(child => recurseFiles(path.join(p, child)));
    } else {
        if (path.extname(p) === ".ts") {
            fileNames.push(p);
        }
    }
}

recurseFiles(inputPath);

var options: ts.CompilerOptions = {
    target: ts.ScriptTarget.ES5,
    module: ts.ModuleKind.CommonJS
};
var host = ts.createCompilerHost(options);
var program = ts.createProgram(fileNames, options, host);

program.getSourceFiles().forEach(scan);

console.log("globals");
globals.print(1, inputPath);

externals.forEach(e => {
    console.log("external: " + e.path);
    e.print(1, inputPath);
});
