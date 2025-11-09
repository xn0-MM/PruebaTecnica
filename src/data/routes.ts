export interface IRoutes {
    baseUrl: string;
    loginPage: string;
    homePage: string;
    newCustomerPage: string;
}

export const routes: IRoutes = {
    baseUrl: 'https://demo.guru99.com',
    loginPage: '/V4',
    homePage: '/V4/manager/Managerhomepage.php',
    newCustomerPage: '/V4/manager/addcustomerpage.php',
};
