import AwsOriginal from "devicons-react/icons/AmazonwebservicesOriginalWordmark";
import AnsibleOriginal from "devicons-react/icons/AnsibleOriginal";
import AntdesignOriginal from "devicons-react/icons/AntdesignOriginal";
import ApacheairflowOriginal from "devicons-react/icons/ApacheairflowOriginal";
import ApachekafkaOriginal from "devicons-react/icons/ApachekafkaOriginal";
import ApachehttpdOriginal from "devicons-react/icons/ApacheOriginal";
import ApachesparkOriginal from "devicons-react/icons/ApachesparkOriginal";
import AzureOriginal from "devicons-react/icons/AzureOriginal";
import BlazorOriginal from "devicons-react/icons/BlazorOriginal";
import BootstrapOriginal from "devicons-react/icons/BootstrapOriginal";
import BulmaOriginal from "devicons-react/icons/BulmaPlain";
import ApachecassandraOriginal from "devicons-react/icons/CassandraOriginal";
import CircleciOriginal from "devicons-react/icons/CircleciPlain";
import CmakeOriginal from "devicons-react/icons/CmakeOriginal";
import CsharpOriginal from "devicons-react/icons/CsharpOriginal";
import Css3Original from "devicons-react/icons/Css3Original";
import D3jsOriginal from "devicons-react/icons/D3jsOriginal";
import DjangoOriginal from "devicons-react/icons/DjangoPlain";
import DjangorestOriginal from "devicons-react/icons/DjangorestOriginal";
import DockerOriginal from "devicons-react/icons/DockerOriginal";
import ElasticsearchOriginal from "devicons-react/icons/ElasticsearchOriginal";
import ElectronOriginal from "devicons-react/icons/ElectronOriginal";
import FastapiOriginal from "devicons-react/icons/FastapiOriginal";
import FlaskOriginal from "devicons-react/icons/FlaskOriginal";
import FlutterOriginal from "devicons-react/icons/FlutterOriginal";
import FoundationOriginal from "devicons-react/icons/FoundationOriginal";
import GitlabOriginal from "devicons-react/icons/GitlabOriginal";
import GitOriginal from "devicons-react/icons/GitOriginal";
import GoOriginal from "devicons-react/icons/GoOriginal";
import GradleOriginal from "devicons-react/icons/GradleOriginal";
import GrafanaOriginal from "devicons-react/icons/GrafanaOriginal";
import GraphqlOriginal from "devicons-react/icons/GraphqlPlain";
import ApachehadoopOriginal from "devicons-react/icons/HadoopOriginal";
import Html5Original from "devicons-react/icons/Html5Original";
import IonicOriginal from "devicons-react/icons/IonicOriginal";
import JavascriptOriginal from "devicons-react/icons/JavascriptOriginal";
import JenkinsOriginal from "devicons-react/icons/JenkinsOriginal";
import KotlinOriginal from "devicons-react/icons/KotlinOriginal";
import KubernetesOriginal from "devicons-react/icons/KubernetesOriginal";
import LaravelOriginal from "devicons-react/icons/LaravelOriginal";
import MaterialuiOriginal from "devicons-react/icons/MaterialuiOriginal";
import ApachemavenOriginal from "devicons-react/icons/MavenOriginal";
import MobxOriginal from "devicons-react/icons/MobxOriginal";
import MongodbOriginal from "devicons-react/icons/MongodbOriginal";
import MysqlOriginal from "devicons-react/icons/MysqlOriginal";
import NextjsOriginal from "devicons-react/icons/NextjsOriginal";
import NginxOriginal from "devicons-react/icons/NginxOriginal";
import NuxtjsOriginal from "devicons-react/icons/NuxtjsOriginal";
import OpencvOriginal from "devicons-react/icons/OpencvOriginal";
import PostgresqlOriginal from "devicons-react/icons/PostgresqlOriginal";
import PrometheusOriginal from "devicons-react/icons/PrometheusOriginal";
import PythonOriginal from "devicons-react/icons/PythonOriginal";
import PytorchOriginal from "devicons-react/icons/PytorchOriginal";
import RabbitmqOriginal from "devicons-react/icons/RabbitmqOriginal";
import ReactOriginal from "devicons-react/icons/ReactOriginal";
import RedisOriginal from "devicons-react/icons/RedisOriginal";
import ReduxOriginal from "devicons-react/icons/ReduxOriginal";
import RubyOriginal from "devicons-react/icons/RubyOriginal";
import RustOriginal from "devicons-react/icons/RustOriginal";
import ScikitlearnOriginal from "devicons-react/icons/ScikitlearnOriginal";
import SocketioOriginal from "devicons-react/icons/SocketioOriginal";
import SpringOriginal from "devicons-react/icons/SpringOriginal";
import SvelteOriginal from "devicons-react/icons/SvelteOriginal";
import SwiftOriginal from "devicons-react/icons/SwiftOriginal";
import TailwindcssOriginal from "devicons-react/icons/TailwindcssOriginal";
import TensorflowOriginal from "devicons-react/icons/TensorflowOriginal";
import TerraformOriginal from "devicons-react/icons/TerraformOriginal";
import ThreejsOriginal from "devicons-react/icons/ThreejsOriginal";
import TypescriptOriginal from "devicons-react/icons/TypescriptOriginal";
import VagrantOriginal from "devicons-react/icons/VagrantOriginal";
import VuejsOriginal from "devicons-react/icons/VuejsOriginal";

export const technologyIcons: Record<
    string,
    {
        tags: string[];
        Icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | null;
    }
> = {
    ansible: {
        tags: ["ansible", "automation", "orchestration"],
        Icon: AnsibleOriginal,
    },
    ant: {
        tags: ["ant", "build", "java"],
        Icon: null,
    },
    ant_design: {
        tags: ["ant design", "ui", "react"],
        Icon: AntdesignOriginal,
    },
    apache_airflow: {
        tags: ["apache airflow", "workflow", "scheduler", "data"],
        Icon: ApacheairflowOriginal,
    },
    apache_cassandra: {
        tags: ["apache cassandra", "database", "nosql"],
        Icon: ApachecassandraOriginal,
    },
    apache_flume: {
        tags: ["apache flume", "data ingestion", "streaming"],
        Icon: null,
    },
    apache_hadoop: {
        tags: ["apache hadoop", "big data", "distributed"],
        Icon: ApachehadoopOriginal,
    },
    apache_httpd: {
        tags: ["apache httpd", "web server", "http"],
        Icon: ApachehttpdOriginal,
    },
    apache_kafka: {
        tags: ["apache kafka", "streaming", "messaging", "event"],
        Icon: ApachekafkaOriginal,
    },
    apache_maven: {
        tags: ["apache maven", "build", "java"],
        Icon: ApachemavenOriginal,
    },
    apache_spark: {
        tags: ["apache spark", "big data", "analytics"],
        Icon: ApachesparkOriginal,
    },
    aws: {
        tags: ["aws", "cloud", "amazon"],
        Icon: AwsOriginal,
    },
    azure: {
        tags: ["azure", "cloud", "microsoft"],
        Icon: AzureOriginal,
    },
    bazel: {
        tags: ["bazel", "build", "automation"],
        Icon: null,
    },
    blazor: {
        tags: ["blazor", "webassembly", "dotnet"],
        Icon: BlazorOriginal,
    },
    bootstrap: {
        tags: ["bootstrap", "css", "ui", "framework"],
        Icon: BootstrapOriginal,
    },
    bulma: {
        tags: ["bulma", "css", "ui", "framework"],
        Icon: BulmaOriginal,
    },
    caddy: {
        tags: ["caddy", "web server", "http"],
        Icon: null,
    },
    circleci: {
        tags: ["circleci", "ci", "cd", "automation"],
        Icon: CircleciOriginal,
    },
    clickhouse: {
        tags: ["clickhouse", "database", "analytics"],
        Icon: null,
    },
    cmake: {
        tags: ["cmake", "build", "c++"],
        Icon: CmakeOriginal,
    },
    csharp: {
        tags: ["c#", "dotnet", "language"],
        Icon: CsharpOriginal,
    },
    css: {
        tags: ["css", "style", "web"],
        Icon: Css3Original,
    },
    d3js: {
        tags: ["d3.js", "visualization", "javascript"],
        Icon: D3jsOriginal,
    },
    django: {
        tags: ["django", "python", "web"],
        Icon: DjangoOriginal,
    },
    djangorf: {
        tags: ["djangorestframework", "api", "python"],
        Icon: DjangorestOriginal,
    },
    docker: {
        tags: ["docker", "container", "devops"],
        Icon: DockerOriginal,
    },
    elasticsearch: {
        tags: ["elasticsearch", "search", "database"],
        Icon: ElasticsearchOriginal,
    },
    electron: {
        tags: ["electron", "desktop", "javascript"],
        Icon: ElectronOriginal,
    },
    fastapi: {
        tags: ["fastapi", "python", "web", "api"],
        Icon: FastapiOriginal,
    },
    flask: {
        tags: ["flask", "python", "web"],
        Icon: FlaskOriginal,
    },
    flutter: {
        tags: ["flutter", "mobile", "dart"],
        Icon: FlutterOriginal,
    },
    foundation: {
        tags: ["foundation", "css", "ui", "framework"],
        Icon: FoundationOriginal,
    },
    git: {
        tags: ["git", "version control", "vcs"],
        Icon: GitOriginal,
    },
    gitlab_ci: {
        tags: ["gitlab", "ci", "cd", "automation"],
        Icon: GitlabOriginal,
    },
    golang: {
        tags: ["go", "golang", "language"],
        Icon: GoOriginal,
    },
    gradle: {
        tags: ["gradle", "build", "automation"],
        Icon: GradleOriginal,
    },
    grafana: {
        tags: ["grafana", "monitoring", "dashboard"],
        Icon: GrafanaOriginal,
    },
    graphql: {
        tags: ["graphql", "api", "query"],
        Icon: GraphqlOriginal,
    },
    haproxy: {
        tags: ["haproxy", "load balancer", "proxy"],
        Icon: null,
    },
    html: {
        tags: ["html", "web", "markup"],
        Icon: Html5Original,
    },
    ionic: {
        tags: ["ionic", "mobile", "framework"],
        Icon: IonicOriginal,
    },
    javascript: {
        tags: ["javascript", "language", "web"],
        Icon: JavascriptOriginal,
    },
    jenkins: {
        tags: ["jenkins", "ci", "cd", "automation"],
        Icon: JenkinsOriginal,
    },
    jwt: {
        tags: ["jwt", "authentication", "token"],
        Icon: null,
    },
    kotlin: {
        tags: ["kotlin", "language", "android"],
        Icon: KotlinOriginal,
    },
    kubernetes: {
        tags: ["kubernetes", "container", "orchestration"],
        Icon: KubernetesOriginal,
    },
    laravel: {
        tags: ["laravel", "php", "web"],
        Icon: LaravelOriginal,
    },
    makefile: {
        tags: ["makefile", "build", "automation"],
        Icon: null,
    },
    material_ui: {
        tags: ["material ui", "react", "ui"],
        Icon: MaterialuiOriginal,
    },
    mobx: {
        tags: ["mobx", "state management", "react"],
        Icon: MobxOriginal,
    },
    mongodb: {
        tags: ["mongodb", "database", "nosql"],
        Icon: MongodbOriginal,
    },
    mysql: {
        tags: ["mysql", "database", "sql"],
        Icon: MysqlOriginal,
    },
    nextjs: {
        tags: ["next.js", "react", "framework"],
        Icon: NextjsOriginal,
    },
    nginx: {
        tags: ["nginx", "web server", "reverse proxy"],
        Icon: NginxOriginal,
    },
    nuxtjs: {
        tags: ["nuxt.js", "vue", "framework"],
        Icon: NuxtjsOriginal,
    },
    opencv: {
        tags: ["opencv", "computer vision", "image"],
        Icon: OpencvOriginal,
    },
    postgresql: {
        tags: ["postgresql", "database", "sql"],
        Icon: PostgresqlOriginal,
    },
    prometheus: {
        tags: ["prometheus", "monitoring", "metrics"],
        Icon: PrometheusOriginal,
    },
    python: {
        tags: ["python", "language", "scripting"],
        Icon: PythonOriginal,
    },
    pytorch: {
        tags: ["pytorch", "machine learning", "ai"],
        Icon: PytorchOriginal,
    },
    rabbitmq: {
        tags: ["rabbitmq", "messaging", "queue"],
        Icon: RabbitmqOriginal,
    },
    react: {
        tags: ["react", "javascript", "ui"],
        Icon: ReactOriginal,
    },
    redis: {
        tags: ["redis", "database", "cache"],
        Icon: RedisOriginal,
    },
    redux: {
        tags: ["redux", "state management", "react"],
        Icon: ReduxOriginal,
    },
    ruby: {
        tags: ["ruby", "language", "rails"],
        Icon: RubyOriginal,
    },
    rust: {
        tags: ["rust", "language", "systems"],
        Icon: RustOriginal,
    },
    saml: {
        tags: ["saml", "authentication", "security"],
        Icon: null,
    },
    "scikit-learn": {
        tags: ["scikit-learn", "machine learning", "python"],
        Icon: ScikitlearnOriginal,
    },
    socketio: {
        tags: ["socket.io", "websockets", "realtime"],
        Icon: SocketioOriginal,
    },
    springboot: {
        tags: ["spring boot", "java", "web"],
        Icon: SpringOriginal,
    },
    styled_components: {
        tags: ["styled-components", "css", "react"],
        Icon: null,
    },
    svelte: {
        tags: ["svelte", "javascript", "ui"],
        Icon: SvelteOriginal,
    },
    swift: {
        tags: ["swift", "language", "ios"],
        Icon: SwiftOriginal,
    },
    tailwindcss: {
        tags: ["tailwindcss", "css", "framework"],
        Icon: TailwindcssOriginal,
    },
    tensorflow: {
        tags: ["tensorflow", "machine learning", "ai"],
        Icon: TensorflowOriginal,
    },
    terraform: {
        tags: ["terraform", "infrastructure", "devops"],
        Icon: TerraformOriginal,
    },
    threejs: {
        tags: ["three.js", "3d", "javascript"],
        Icon: ThreejsOriginal,
    },
    typescript: {
        tags: ["typescript", "language", "javascript"],
        Icon: TypescriptOriginal,
    },
    vagrant: {
        tags: ["vagrant", "virtualization", "devops"],
        Icon: VagrantOriginal,
    },
    vuejs: {
        tags: ["vue.js", "javascript", "ui"],
        Icon: VuejsOriginal,
    },
    vuex: {
        tags: ["vuex", "state management", "vue"],
        Icon: null,
    },
    websockets: {
        tags: ["websockets", "realtime", "communication"],
        Icon: null,
    },
};
