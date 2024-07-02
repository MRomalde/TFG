using Banco_VVBA.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Banco_VVBA.Services.UserService
{
    interface IUserService
    {
        Task<IEnumerable<UsersViewModel>> Login(LoginModel loginModel);
        bool CheckIfDniExistInDb(string dni);
        bool CheckIfLoginExistInDb(string login);
        bool CheckIfEmailExistInDb(string email);
        Task<ActionResult<UsersViewModel>> Register(UsersViewModel userModel);
        string CheckIfAliasExistInDbAndReturnGoodAlias(string alias);
        IEnumerable<UsersViewModel> FindUserByDni(string dni);
        Task<IEnumerable<UsersViewModel>> GetAllUsers();
        Task<IEnumerable<UsersViewModel>> SearchByName(string name);
        Task<UsersViewModel> FindUserById(int id);
        Task<ActionResult> DeleteUser(UsersViewModel user);
        Task<ActionResult<IEnumerable<UserTypeAccessViewModel>>> GetAllUserTypeAccess();
        Task<IEnumerable<UsersViewModel>> FindUserByIdAndReturnList(int id);
        Task<IActionResult> UpdateUser(int id, UsersViewModel user);
        Task<IEnumerable<UsersViewModel>> FindUserByGmail(string gmail);
    }
}
