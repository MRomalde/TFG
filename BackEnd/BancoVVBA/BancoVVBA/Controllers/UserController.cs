using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Banco_VVBA.Context;
using Banco_VVBA.Models;
using Banco_VVBA.Services.UserService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MailKit.Net.Smtp;
using MailKit;
using MimeKit;

namespace Banco_VVBA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        #region Service declaration
        private IUserService _userService;
        #endregion
        #region Constructor
        public UserController(IConfiguration configuration, BancoVVBAContext bancoVVBAContext)
        {
            _userService = new UserService(bancoVVBAContext, configuration);
        }
        #endregion

        //Get:api/[controller]/getAllUsers
        [HttpGet("getAllUsers")]
        public async Task<ActionResult<IEnumerable<UsersViewModel>>> GetAllUsers()
        {
            var users = await _userService.GetAllUsers();
            return Ok(users);

        }
        //Get:api/[controller]/findUserById/{id}
        [HttpGet("findUserById/{id}")]
        public async Task<IEnumerable<UsersViewModel>> findUserById(int id)
        {
            var result = await _userService.FindUserByIdAndReturnList(id);
            return result;
        }
        //Get:api/[controller]/name/{name}
        [HttpGet("name/{name}")]
        public async Task<IEnumerable<UsersViewModel>> SearchByName(string name)
        {
            var usersByName = await _userService.SearchByName(name);
            return usersByName;
        }
        //Get:api/[controller]/findUserByMail
        [HttpGet("findUserByMail/{mail}")]
        public async Task<IEnumerable<UsersViewModel>> FindUserByMail(string mail)
        {
            var user = await _userService.FindUserByGmail(mail);
            return user;
        }

        //Post:api/[controller]/login
        [HttpPost("login")]
        public async Task<ActionResult<IEnumerable<UsersViewModel>>> Login(LoginModel loginModel)
        {
            var user = await _userService.Login(loginModel);
            if(user.Count()!=0)
                return Ok(user);
            else
                return NoContent();            
        }
        //Post:api/[controller]/register
        [HttpPost("register")]
        public async Task<ActionResult<UsersViewModel>> Register(UsersViewModel userModel)
        {
            var result= await _userService.Register(userModel);
            return result;
        }
        //Post:api/[controller]/passwordRecovery
        [HttpGet("passwordRecovery/{mail}")]
        public async Task<bool> PasswordRecovery(string mail)
        {
            var user = await _userService.FindUserByGmail(mail);
            string NewPassword=GenerateNewPassword();
            if (user.Any())
            {
                //instantiate mimemessage
                var message = new MimeMessage();
                //From address
                message.From.Add(new MailboxAddress("BancoVVBA", "BancoVVBA@gmail.com"));
                //To address
                message.To.Add(new MailboxAddress(user.ElementAt(0).SurnameName, mail));
                //Subject
                message.Subject = "Recuperar Contraseña";
                //Body
                message.Body = new TextPart("plain")
                {
                    Text = "Hola Su nueva contraseña es: " + NewPassword
                };
                using (var client = new SmtpClient())
                {
                    client.Connect("smtp.gmail.com", 587, false);
                    //have to create a gmail with that 
                    client.Authenticate("BancoVVBA@gmail.com", "altair2019");
                    client.Send(message);
                    client.Disconnect(true);

                }
                user.ElementAt(0).Password = NewPassword;
                await _userService.UpdateUser(user.ElementAt(0).UserId, user.ElementAt(0));
                return true;
            }
            else
                return false;
        }

        private string GenerateNewPassword()
        {
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var stringChars = new char[8];
            var random = new Random();

            for (int i = 0; i < stringChars.Length; i++)
            {
                stringChars[i] = chars[random.Next(chars.Length)];
            }

            var finalString = new String(stringChars);
            return finalString;
        }

        //Put:api/[controller]/updateUser/{id}
        [HttpPut("updateUser/{id}")]
        public async Task<IActionResult> UpdateUser(int id,UsersViewModel user)
        {
            if (id != user.UserId)
            {
                return BadRequest();
            }
            await _userService.UpdateUser(id, user);
            return Ok();
        }


        //Delete:api/[controller]/deleteById
        [HttpDelete("delete/{id}")]
        public async Task<ActionResult> DeleteById(int id)
        {
            var user = await _userService.FindUserById(id);
            if (user == null)
                return NotFound();

            await _userService.DeleteUser(user);
            return Ok();
        }

        //Get:api/[controller]/geAllUserTypeAccess
        [HttpGet("getAllUserTypeAccess")]
        public async Task<ActionResult<IEnumerable<UserTypeAccessViewModel>>> GetAllUserTypeAccess()
        {
            var result = await _userService.GetAllUserTypeAccess();
            return result;
        }


        //Get:api/[controller]/findByDni
        [HttpGet("FindUserByDni/{dni}")]
        public  IEnumerable<UsersViewModel> FindUserByDni(string dni)
        {
            var user =  _userService.FindUserByDni(dni);
            return user;
        }
        
        #region Server Validators
        // GET: api/[controller]/checkdni/dni
        [HttpGet("CheckIfDniExistInDb/{dni}")]
        public bool CheckIfDniExistInDb(string dni)
        {
            return _userService.CheckIfDniExistInDb(dni);
        }

        [HttpGet("CheckIfLoginExistInDb/{login}")]
        public bool CheckIfLoginExistInDb(string login)
        {
            return _userService.CheckIfLoginExistInDb(login);
        }
        [HttpGet("CheckIfEmailExistInDb/{email}")]
        public bool CheckIfEmailExistInDb(string email)
        {
            return _userService.CheckIfEmailExistInDb(email);
        }
        [HttpGet("CheckIfAliasExistInDb/{alias}")]
        public string CheckIfAliasExistInDb(string alias)
        {
            var result=  _userService.CheckIfAliasExistInDbAndReturnGoodAlias(alias);
            return result;
        }
        #endregion

    }
}
