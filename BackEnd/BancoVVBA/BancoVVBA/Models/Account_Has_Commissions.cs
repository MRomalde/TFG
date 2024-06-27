using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Banco_VVBA.Models
{
    public class Account_Has_Commissions
    {
        [Key]
        public int AccountsHasCommissionsId { get; set; }

        public int AccountId { get; set; }
        [ForeignKey("AccountId")]
        public virtual required UserAccountsViewModel Account { get; set; }

        public int CommissionId { get; set; }
        [ForeignKey("CommissionId")]
        public virtual required CommissionsViewModel Commission { get; set; }
    }
}
