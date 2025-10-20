using Backend.Interface;
using Backend.Model;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repository
{
	public class CustomerTypeRepository: ICustomerTypeRespository
	{
		private readonly MyDbContext _context;

		public CustomerTypeRepository(MyDbContext context)
		{
			_context = context;
		}

		public async Task AddCustomerType(CustomerType customerType)
		{
			await _context.AddAsync(customerType);
			await _context.SaveChangesAsync();
		}
		public async Task<ICollection<CustomerType>> GetAllCustomerTypes()
		{
			var res = await _context.CustomerTypes.ToListAsync();
			return res;
		}
	}
}
