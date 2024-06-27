using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Banco_VVBA.Models
{
    public class LoginModel
    {
        [Required]
        public required string UserName { get; set; }
        public required string Password { get; set; }
    }
}
