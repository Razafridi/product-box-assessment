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

        public async Task AddCustomer(CustomerCreateDTO customer)
		{
			var custType = await _context.CustomerTypes.FirstOrDefaultAsync(x => x.Id == customer.TypeId);
			if (custType != null)
			{
				var cust = new Customer
				{
					Address = customer.Address,
					City = customer.City,
					Description = customer.Description,
					Name = customer.Name,
					State = customer.State,
					Zips = customer.Zips,
					LastUpdated = DateTime.Now,
					CustomerType = custType

				};
				await _context.AddAsync(cust);
				await _context.SaveChangesAsync();
			}
		}
		public async Task UpdateCustomer(CustomerUpdateDTO customer)
		{
			var custType = await _context.CustomerTypes.FirstOrDefaultAsync(x => x.Id == customer.TypeId);
			if (custType != null)
			{
				var cust = new Customer
				{
					Id = customer.id,
					Address = customer.Address,
					City = customer.City,
					Description = customer.Description,
					Name = customer.Name,
					State = customer.State,
					Zips = customer.Zips,
					LastUpdated = DateTime.Now,
					CustomerType = custType

				};
				_context.Update(cust);
				await _context.SaveChangesAsync();
			}
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
		public async Task<CustomerDTO?> GetCustomerById(int id)
		{
			var customer = _context.Customers.Include(c => c.CustomerType).FirstOrDefault(x => x.Id == id);
			if(customer == null)
			{
				return null;
			}

			var custDto = new CustomerDTO
			{
				Address = customer.Address,
				City = customer.City,
				Id = customer.Id,
				Description = customer.Description,
				Name = customer.Name,
				LastUpdated = customer.LastUpdated,
				State = customer.State,
				Zips = customer.Zips,
				CustomerType = customer.CustomerType != null ? new CustomerTypeDTO { Id=customer.CustomerType.Id, Name=customer.CustomerType.Name} :null,

			};

			return custDto;


		}


	}
}
