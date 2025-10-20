using Backend.Model;

namespace Backend.DTO
{
	public class CustomerDTO
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string? Description { get; set; }
		public string Address { get; set; }
		public string City { get; set; }
		public string State { get; set; }
		public string Zips { get; set; }
		public DateTime LastUpdated { get; set; }
		public CustomerTypeDTO? CustomerType { get; set; }
	}



	public class CustomerTypeDTO
	{
		public int Id { get; set; }
		public string Name { get; set; }
	}
}
