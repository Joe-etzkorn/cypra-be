import User from './user.model';
import Role from './role.model';
import RequestedAccount from './requested-account.model';
import UserInvitation from './user-invitation.model';

export const setupAssociations = (): void => {
  process.nextTick(() => {
    User.belongsTo(Role, { foreignKey: 'roleId' });
    User.belongsTo(User, { as: 'parent', foreignKey: 'parentId' });
    User.hasOne(RequestedAccount, {
      foreignKey: 'userId',
      as: 'requestedAccount',
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
    User.hasMany(UserInvitation, {
      foreignKey: 'invitedUserId',
      as: 'invitations',
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });

    RequestedAccount.belongsTo(User, {
      foreignKey: 'userId',
      as: 'user', // Alias for the relationship
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });

    RequestedAccount.beforeCreate(async (requestedAccount) => {
      const existingUser = await User.findOne({
        where: { email: requestedAccount.email },
      });
      if (existingUser) {
        requestedAccount.hasExistedAccount = true;
      }
    });

    UserInvitation.belongsTo(User, {
      foreignKey: 'invitedUserId',
      as: 'invitedUser',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  });
};
