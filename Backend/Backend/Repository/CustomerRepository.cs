using Backend.DTO;
using Backend.Interface;
using Backend.Model;
using Microsoft.EntityFrameworkCore;
using System.Collections;

namespace Backend.Repository
{
	public class CustomerRepository : ICustomerRepository
	{
        private readonly MyDbContext _context;

        public CustomerRepository(MyDbContext context)
        {
			_context = context;
        }

        public async Task AddCustomer(Customer customer)
		{
			await _context.AddAsync(customer);
			await _context.SaveChangesAsync();
		}
		public async Task UpdateCustomer(Customer customer)
		{
			_context.Update(customer);
			await _context.SaveChangesAsync();
		}
		public async Task DeleteCustomer(int customerId)
		{
			await _context.Customers.Where(x => x.Id == customerId)
			.ExecuteDeleteAsync();
		}

		public async Task<ICollection<CustomerDTO>> GetAllCustomers()
		{
			var customers = await _context.Customers.Include(x =>x.CustomerType).Select(c => new CustomerDTO
			{
				Zips = c.Zips,
				State = c.State,
				LastUpdated = c.LastUpdated,
				Address = c.Address,
				Description = c.Description,
				Name = c.Name,
				City = c.City,
				Id = c.Id,
				CustomerType = c.CustomerType == null ? null : new CustomerTypeDTO
				{
					Id = c.CustomerType.Id,
					Name = c.CustomerType.Name,

				}
			}).ToListAsync();
			

			return customers;
		}
		//public async Task<Customer> GetCustomerById(int id)
		//{
		//	return new Customer { };
		//}


	}
}
