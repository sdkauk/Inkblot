using Inkblot.BusinessLogic.JournalEntries;
using Inkblot.BusinessLogic.JournalEntries.Requests;
using Inkblot.Common.Models;
using Microsoft.AspNetCore.Mvc;

namespace Inkblot.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class JournalEntryController : ControllerBase
    {

        private readonly IJournalEntryService journalEntryService;

        public JournalEntryController(IJournalEntryService journalEntryService)
        {
            this.journalEntryService = journalEntryService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<JournalEntry>>> Get()
        {
            var entries = await journalEntryService.GetAllJournalEntriesAsync();
            return Ok(entries);
        }

        [HttpGet("{id:Guid}")]
        public async Task<ActionResult<JournalEntry>> Get(Guid id)
        {
            var entry = await journalEntryService.GetJournalEntryAsync(id);
            return Ok(entry);
        }

        [HttpPost]
        public async Task<ActionResult<JournalEntry>> Post(JournalEntryPostRequest request)
        {
            var entry = await journalEntryService.CreateJournalEntry(request);
            return CreatedAtAction(nameof(Get), new { id = entry.Id }, entry);
        }

        [HttpPut]
        public async Task<IActionResult> Put(JournalEntryPutRequest request)
        {
            var brief = await journalEntryService.UpdateJournalEntryAsync(request);
            return Ok(brief);
        }

        [HttpDelete("{id:Guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await journalEntryService.DeleteJournalEntryAsync(id);
            return NoContent();
        }

    }
}
