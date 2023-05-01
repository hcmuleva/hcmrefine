
import {
    GitHubBanner,
    Refine,
    AuthBindings,
    Authenticated,
} from "@refinedev/core";
import { notificationProvider, ThemedLayoutV2, ErrorComponent,AuthPage, } from "@refinedev/antd";

import { DataProvider, AuthHelper } from "@refinedev/strapi-v4";
import axios from "axios";
import routerProvider, {
    CatchAllNavigate,
    NavigateToResource,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import "@refinedev/antd/dist/reset.css";

import { ProjectList, ProjectCreate, ProjectEdit, ProjectShow } from "./pages/projects";
import { TOKEN_KEY, API_URL } from "./constants";
import ConfigList from "./pages/configs/list";
import ConfigCreate from "./pages/configs/create";
import ConfigEdit from "./pages/configs/edit";
import ConfigDetail from "./pages/configs/show";
import ConfigCreateWithProject from "./pages/configs/createconfig";

//const API_URL = "https://api.fake-rest.refine.dev";

const App = () => {
    const axiosInstance = axios.create();
    const strapiAuthHelper = AuthHelper(API_URL + "/api");
    const authProvider = {
        login: async ({ email, password }) => {
            const { data, status } = await strapiAuthHelper.login(
                email,
                password,
            );
            if (status === 200) {
                localStorage.setItem(TOKEN_KEY, data.jwt);

                // set header axios instance
                axiosInstance.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${data.jwt}`;

                return {
                    success: true,
                    redirectTo: "/",
                };
            }
            return {
                success: false,
                error: {
                    message: "Login failed",
                    name: "Invalid email or password",
                },
            };
        },
        logout: async () => {
            localStorage.removeItem(TOKEN_KEY);
            return {
                success: true,
                redirectTo: "/login",
            };
        },
        onError: async (error) => {
            console.error(error);
            return { error };
        },
        check: async () => {
            const token = localStorage.getItem(TOKEN_KEY);
            if (token) {
                axiosInstance.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${token}`;
                return {
                    authenticated: true,
                };
            }

            return {
                authenticated: false,
                error: {
                    message: "Authentication failed",
                    name: "Token not found",
                },
                logout: true,
                redirectTo: "/login",
            };
        },
        getPermissions: async () => null,
        getIdentity: async () => {
            const token = localStorage.getItem(TOKEN_KEY);
            if (!token) {
                return null;
            }

            const { data, status } = await strapiAuthHelper.me(token);
            if (status === 200) {
                const { id, username, email } = data;
                return {
                    id,
                    username,
                    email,
                };
            }

            return null;
        },
    };
    return (
        <BrowserRouter>
            <GitHubBanner />
            <Refine
                 authProvider={authProvider}
                 dataProvider={DataProvider(API_URL + "/api", axiosInstance)}
                 routerProvider={routerProvider}
                resources={[
                    {
                        name: "projects",
                        list: ProjectList,
                        create: ProjectCreate,
                        edit: ProjectEdit,
                        show: ProjectShow,
                    },
                    {
                        name: "configs",
                        list: ConfigList,
                        create: ConfigCreate,
                        edit: ConfigEdit,
                        show: ConfigDetail,
                        createconfig:ConfigCreateWithProject,
                    },
                ]}
                notificationProvider={notificationProvider}
                options={{
                    warnWhenUnsavedChanges: true,
                    syncWithLocation: true,
                }}
            >
                <Routes>
                    <Route
                        element={
                            <Authenticated
                                fallback={<CatchAllNavigate to="/login" />}
                            >
                                <ThemedLayoutV2>
                                    <Outlet />
                                </ThemedLayoutV2>
                            </Authenticated>
                        }
                    >
                        <Route
                            index
                            element={<NavigateToResource resource="projects" />}
                        />

                        <Route path="/projects">
                            <Route index element={<ProjectList />} />
                            <Route path="create" element={<ProjectCreate />} />
                            <Route path="edit/:id" element={<ProjectEdit />} />
                            <Route path="show/:id" element={<ProjectShow />} />
                        </Route>

                        <Route path="/configs">
                            <Route index element={<ConfigList />} />
                            <Route path="create" element={<ConfigCreate />} />
                            <Route path="create/:projectId/:id" element={<ConfigCreateWithProject />} />
                            <Route path="edit/:id" element={<ConfigEdit />} />
                            <Route path="show/:id" element={<ConfigDetail />} />
                        </Route>
                    </Route>
                    <Route
                            element={
                                <Authenticated fallback={<Outlet />}>
                                    <NavigateToResource resource="projects" />
                                </Authenticated>
                            }
                        >
                            <Route
                                path="/login"
                                element={
                                    <AuthPage
                                        type="login"
                                        formProps={{
                                            initialValues: {
                                                email: "demo@refine.dev",
                                                password: "demodemo",
                                            },
                                        }}
                                    />
                                }
                            />
                        </Route>
                        <Route
                            element={
                                <Authenticated>
                                    <ThemedLayoutV2>
                                        <Outlet />
                                    </ThemedLayoutV2>
                                </Authenticated>
                            }
                        >
                            <Route path="*" element={<ErrorComponent />} />
                        </Route>
                </Routes>
                <UnsavedChangesNotifier />
            </Refine>
        </BrowserRouter>
    );
};

export default App;
