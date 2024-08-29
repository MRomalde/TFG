using Banco_VVBA.Context;
using Banco_VVBA.Controllers;
using Banco_VVBA.Models;
using Banco_VVBA.Services.AccountService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Banco_VVBA.Models;

namespace Banco_VVBA.Repositories
{
    public class UserRepository : Controller
    {
        #region Fields
        private readonly IConfiguration _configuration;
        private readonly BancoVVBAContext _context;
        public AccountService _accountService;
        public string ibanForNewAccount;
        public UserAccountsViewModel accountForNewUser = new UserAccountsViewModel
        {
            Balance = 0.0,
            IBAN = "IBAN a modificar",
            UserId = -1
        };
        #endregion
        #region Constructor
        public UserRepository(BancoVVBAContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }
        #endregion
        public async Task<IEnumerable<UsersViewModel>> FindUserByLogin(LoginModel loginModel)
        {
            var user = await _context.Users.Include(User => User.TypeAccess)
                .Where(User => User.Login == loginModel.UserName && User.Password == loginModel.Password).ToListAsync();
            return user;
        }
        internal async Task<ActionResult<UsersViewModel>> Register(UsersViewModel userModel)
        {
            //create here an instance of the account service
            _accountService = new AccountService(_context, _configuration);
            var newUser = new UsersViewModel
            {
                SurnameName = userModel.SurnameName,
                Alias = userModel.Alias,
                Login = userModel.Login,
                Password = userModel.Password,
                Dni = userModel.Dni,
                Telephone = userModel.Telephone,
                Mail = userModel.Mail,
                TypeAccessId = userModel.TypeAccessId,
                // No necesitas asignar TypeAccess aquí
                TypeAccess = await _context.UsersTypeAccess.FindAsync(userModel.TypeAccessId)
            };
            _context.Users.Add(newUser);
            //create the account for the user
            CreateAccountFromRegister(newUser);
            try
            {
                _context.Accounts.Add(accountForNewUser);
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                // Log the exception (you can use any logging framework)
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }


        }
        internal void CreateAccountFromRegister(UsersViewModel user)
        {

            ibanForNewAccount = OneIBANMore();
            ChargeAccount(ibanForNewAccount, user);

        }
        public string OneIBANMore()
        {
            string iban = "ES";
            int numIban = _accountService.FindLastIban();
            numIban++;
            iban += numIban;
            return iban;

        }
        public void ChargeAccount(string iban, UsersViewModel user)
        {

            accountForNewUser.Balance = 0;
            accountForNewUser.IBAN = iban;
            accountForNewUser.UserId = user.UserId;
            accountForNewUser.User = user;
        }
        internal async Task<IEnumerable<UsersViewModel>> SearchByName(string name)
        {
            var result = await _context.Users.Where(User => User.SurnameName.Contains(name)).ToListAsync();
            return result;
        }

        internal async Task<IEnumerable<UsersViewModel>> FindUserByIdAndReturnList(int id)
        {
            var result = await _context.Users.Where(User => User.UserId == id).ToListAsync();
            return result;
        }

        internal async Task<ActionResult> DeleteUser(UsersViewModel user)
        {
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return Ok();

        }

        internal async Task<ActionResult<IEnumerable<UserTypeAccessViewModel>>> GetAllUserTypeAccess()
        {
            var result = await _context.UsersTypeAccess.ToListAsync();
            return result;
        }

        internal async Task<IActionResult> UpdateUser(int id, UsersViewModel user)
        {
            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok();
        }

        internal async Task<UsersViewModel> FindUserById(int id)
        {
            var user = await _context.Users.FindAsync(id);
            return user;
        }

        internal async Task<IEnumerable<UsersViewModel>> GetAllUsers()
        {
            var users = await _context.Users.Include(User => User.TypeAccess).ToListAsync();
            return users;
        }

        public IEnumerable<UsersViewModel> FindUserByDni(string dni)
        {
              var user =  _context.Users.Include(User => User.TypeAccess).
                     Where(User => User.Dni == dni).ToList();
                return user;
         }

         #region Server validators
            internal IQueryable<UsersViewModel> CompareDni(string dni)
            {
                var existDni = _context.Users.Where(User => User.Dni == dni);
                return existDni;
            }

            internal IQueryable<UsersViewModel> compareEmail(string email)
            {
                var existEmail = _context.Users.Where(User => User.Mail == email);
                return existEmail;
            }

            internal IQueryable<UsersViewModel> compareLogin(string login)
            {
                var existLogin = _context.Users.Where(User => User.Login == login);
                return existLogin;
            }

        internal async Task<IEnumerable<UsersViewModel>> FindUserByGmail(string gmail)
        {
            var result = await _context.Users.Where(User => User.Mail == gmail).ToListAsync();
            return result;
        }

        internal IQueryable<UsersViewModel> compareAlias(string alias)
            {
                var existAlias = _context.Users.Where(User => User.Alias == alias);
                return existAlias;
            }
        #endregion
    }

    }     
    
