using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Banco_VVBA.Models
{
    public class UserAccountsViewModel
    {
        [Key]
        public int AccountId { get; set; }
        [Required]
        public required double Balance { get; set; }
        public required string IBAN { get; set; }
        [Required]
        public required int UserId { get; set;}
        [ForeignKey("UserId")]
        public virtual UsersViewModel User { get; set; }

        public UserAccountsViewModel() { }
    }
}
