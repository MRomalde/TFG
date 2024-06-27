using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Banco_VVBA.Models
{
    public class UserTypeAccessViewModel
    {
        [Key]
        public int TypeAccessId { get; set; }
        [Required]
        public required string Description { get; set; }
    }
}
