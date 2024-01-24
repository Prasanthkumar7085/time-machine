const AdminBro = require('adminjs');
const AdminBroExpress = require('@adminjs/express');
const AdminBroMongoose = require('@adminjs/mongoose');
const { User, Token, Game } = require('../../models');
const { userService } = require('../../services');

const sidebarGroups = {
  user: {
    name: 'User Management',
    icon: 'User',
  },
  token: {
    name: 'Toekn Management',
    icon: 'VideoChat',
  },
  game: {
    name: 'Game Management',
    icon: 'Chat',
  },
};

AdminBro.registerAdapter(AdminBroMongoose);
const adminBro = new AdminBro({
  resources: [
    {
      resource: User,
      options: {
        editProperties: [
          'role',
          'isEmailVerified',
          'isAdmin',
          'isDisclaimerAccepted',
          'osfConsent',
          'gameCompletionCount',
          'age',
          'gender',
          'sex',
          'ethnicity',
          'country',
        ],
      },
    },
    Token,
    Game,
  ],
  rootPath: '/admin',
  branding: {
    companyName: 'TimeMachine Admin',
    softwareBrothers: false,
  },
});
const adminRouter = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  cookieName: process.env.ADMIN_COOKIE_NAME || 'tm-admin',
  cookiePassword: process.env.ADMIN_COOKIE_PASS || 'tm-admin-pass',
  authenticate: async (email, password) => {
    const user = await userService.getUserByEmail(email);
    if (!user || !(await user.isPasswordMatch(password)) || !user.isAdmin) {
      return null;
    }
    return user;
  },
});

module.exports = { adminBro, adminRouter };
