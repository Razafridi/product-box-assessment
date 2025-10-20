using Backend.Model;

namespace Backend.Interface
{
	public interface ICustomerTypeRespository
	{
		public Task AddCustomerType(CustomerType customerType);
		public Task<ICollection<CustomerType>> GetAllCustomerTypes();
	}
}
