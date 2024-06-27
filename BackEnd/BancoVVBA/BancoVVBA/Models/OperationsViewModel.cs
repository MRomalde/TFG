using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Banco_VVBA.Models
{
    public class OperationsViewModel
    {
        [Key]
        public int OperationId { get; set; }
        [Required]
        public required DateTime Date { get; set; }
        [Required]
        public required string Concept { get; set; }
        public string? Message { get; set; }
        [Required]
        public required double Amount { get; set; }
        [Required]
        public required int AccountId { get; set; }
        [ForeignKey("AccountId")]
        public required virtual UserAccountsViewModel Account { get; set; }
    }
}
