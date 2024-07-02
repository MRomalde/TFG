using Banco_VVBA.Context;
using Banco_VVBA.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Banco_VVBA.Repositories
{
    public class CommissionRepository:Controller
    {
        #region Fields
        private BancoVVBAContext _context;
        private IConfiguration _configuration;
        #endregion
        #region Constructor
        public CommissionRepository(IConfiguration configuration, BancoVVBAContext bancoVVBAContext)
        {
            _configuration = configuration;
            _context = bancoVVBAContext;
        }
        #endregion

        internal async Task<IEnumerable<CommissionsViewModel>> GetAllCommissions()
        {
            var result = await _context.Commissions.ToListAsync();
            return result;
        }

        internal async Task<ActionResult> CreateCommission(CommissionsViewModel model)
        {
            _context.Commissions.Add(model);
            await _context.SaveChangesAsync();
            return Ok();
        }

        internal async Task<ActionResult> DeleteCommission(CommissionsViewModel commission)
        {
            _context.Commissions.Remove(commission);
            await _context.SaveChangesAsync();
            return Ok();
        }

        internal async Task<IEnumerable<CommissionsViewModel>> GetCommissionByIdAndReturnList(int id)
        {
            var result = await _context.Commissions.Where(Com=>Com.CommissionId==id).ToListAsync();
            return result;
        }

        internal async Task<CommissionsViewModel> GetCommissionById(int id)
        {
            var result = await _context.Commissions.FindAsync(id);
            return result;
        }

        internal async Task<ActionResult> UpdateCommission(CommissionsViewModel model)
        {
            _context.Entry(model).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
